import { Injectable, NotImplementedException } from '@nestjs/common';
import RunnerStatus from '../data/models/runner-status.enum';
import { Runner } from '../data/models/runner.model';
import { DataSource, In, Not } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { RunnerEntity } from '../data/entities/runner.entity';
import { ConfigurationEntity } from '../data/entities/configuration.entity';
import { RunnerNotFoundError } from '../errors/runner-not-found.error';
import { RunnerDto } from './dtos/runner.dto';
import { ConfigurationNotFoundError } from '../errors/configuration-not-fount.error';
import { IntegrityViolationError } from '../errors/integrity-violation.error';
import { EC2 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RunnerService {
  ec2Client: EC2;

  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    this.ec2Client = new EC2({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }

  /**
   * Returns the number of available runners based on the status and labels
   * @param {RunnerStatus} status - The status of the runners
   * @param {string[]} labels - The labels of the runners
   * @returns {Promise<number>}
   */
  async getAvailableRunners(
    status: RunnerStatus,
    labels: string[],
  ): Promise<number> {
    return await this.dataSource.transaction(async (manager) => {
      const runners = await manager.find(Runner, {
        where: { status: status, labels: In(labels) },
      });
      return runners.length;
    });
  }

  /**
   * Servers as an interface to spin up runners in different environments
   * @param {number} count
   * @param {string[]} labels
   * @throws {NotImplementedException}
   */
  async spinUpRunner(count: number, labels: string[]): Promise<void> {
    if (labels.includes('aws-ec2')) {
      for (let i = 0; i < count; i++) {
        await this.spinUpAWSEC2(labels);
      }
    } else {
      throw new NotImplementedException();
    }
  }

  /**
   * Checks if the number of runners is not less than the minimum required,
   * and enough to pickup workflow jobs
   * @param {RunnerStatus} status
   * @returns {boolean}
   * @throws {ConfigurationNotFoundError}
   * @throws {IntegrityViolationError}
   */
  async isProperNumberOfRunners(status: RunnerStatus): Promise<boolean> {
    return await this.dataSource.transaction(async (manager) => {
      const configuration = await manager.find(ConfigurationEntity);
      if (!configuration) throw new ConfigurationNotFoundError();
      const minimumRequired = configuration[0].minNumberRunnerCount;
      if (minimumRequired <= 0) throw new IntegrityViolationError();
      const runners = await manager.find(RunnerEntity, {
        where: { status: status, next_job_id: Not(null) },
      });
      return runners.length >= minimumRequired;
    });
  }

  /**
   * Servers as an interface to shut down runners in different environments
   * @param {count} count
   * @param {string[]} labels
   * @throws {NotImplementedException}
   */
  async shutDownRunner(count: number, labels: string[]): Promise<void> {
    if (labels.includes('aws-ec2')) {
      for (let i = 0; i < count; i++) {
        await this.shutDownAWSEC2('urn');
      }
    } else {
      throw new NotImplementedException();
    }
  }

  /**
   * Create a new runner on AWS EC2
   * @param {string[]} labels
   * @returns {Promise<void>}
   * @throws {ConfigurationNotFoundError}
   */
  async spinUpAWSEC2(labels: string[]): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [configurations, count] =
        await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      const configuration = configurations[0];
      const bashScript = `
        #!/bin/bash
        RUNNER_VERSION="2.320.0"
        ACCESS_TOKEN="${this.configService.get<string>('GITHUB_ACCESS_TOKEN')}"
        # Ensure the script runs with sufficient privileges
        if [ "$(id -u)" -ne 0 ]; then
          echo "This script must be run as root or with sudo."
          exit 1
        fi
        # Step 1: Create the runner directory
        RUNNER_DIR="/home/ec2-user/actions-runner"
        echo "Creating runner directory at $RUNNER_DIR..."
        mkdir -p "$RUNNER_DIR"
        chown "ec2-user:ec2-user" "$RUNNER_DIR"
        # Step 2: Download GitHub Runner
        RUNNER_TAR="actions-runner-linux-x64-$RUNNER_VERSION.tar.gz"
        RUNNER_URL="https://github.com/actions/runner/releases/download/v$RUNNER_VERSION/$RUNNER_TAR"
        echo "Downloading GitHub Runner from $RUNNER_URL..."
        curl -L -o "$RUNNER_DIR/$RUNNER_TAR" "$RUNNER_URL"
        # Step 3: Extract GitHub Runner
        echo "Extracting GitHub Runner..."
        tar -xzf "$RUNNER_DIR/$RUNNER_TAR" -C "$RUNNER_DIR"
        # Step 4: Get Runner Token
        echo "Fetching runner token from GitHub API..."
        REG_TOKEN_RESPONSE=$(curl -s -X POST \
          -H "Authorization: token ${this.configService.get<string>('GITHUB_ACCESS_TOKEN')}" \
          -H "Accept: application/vnd.github+json" \
          "https://api.github.com/${configuration.githubRepo}/actions/runners/registration-token")

        REG_TOKEN=$(echo "$REG_TOKEN_RESPONSE" | jq -r '.token')
        if [ -z "$REG_TOKEN" ]; then
          echo "Failed to fetch the runner token."
          exit 1
        fi
        # Step 5: Configure GitHub Runner
        echo "Configuring GitHub Runner..."
        sudo -u "ec2-user" bash -c "
          cd $RUNNER_DIR
          ./config.sh --url https://github.com/${configuration.githubRepo} --token $REG_TOKEN --name $(hostname) --work _work --unattended
        "
        # Step 6: Start GitHub Runner
        echo "Installing and starting GitHub Runner service..."
        sudo -u "ec2-user" bash -c "
          cd $RUNNER_DIR
          ./svc.sh install
          ./svc.sh start
        "
      `;
      const params: EC2.RunInstancesRequest = {
        ImageId: configuration.awsEnvironment.imageId,
        InstanceType: configuration.awsEnvironment.instanceType,
        MinCount: 1,
        MaxCount: 1,
        KeyName: configuration.awsEnvironment.keyPairId,
        SecurityGroupIds: [configuration.awsEnvironment.securityGroupId],
        UserData: Buffer.from(bashScript).toString('base64'),
      };
      const instance = await this.ec2Client.runInstances(params).promise();
      const runner = new RunnerEntity();
      runner.labels = labels;
      runner.status = RunnerStatus.Online;
      runner.urn = instance.Instances[0].InstanceId;
      await manager.save(runner);
    });
  }

  /**
   * Shuts down an AWS EC2 instance
   * @param {string} urn - The URN of the EC2 instance
   * @returns {Promise<void>}
   * @throws {RunnerNotFoundError}
   */
  async shutDownAWSEC2(urn: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const runner = await manager.findOne(RunnerEntity, {
        where: { urn: urn },
      });
      if (!runner) throw new RunnerNotFoundError();
      await this.ec2Client
        .terminateInstances({
          InstanceIds: [urn],
        })
        .promise();
      runner.status = RunnerStatus.Offline;
      runner.shutdown_at = new Date();
      await manager.save(runner);
    });
  }

  /**
   * Returns all runners
   * @returns {Promise<Runner[]>}
   */
  async getRunners(): Promise<RunnerDto[]> {
    return await this.dataSource.transaction(async (manager) => {
      const runners = await manager.find(RunnerEntity);
      return this.mapper.mapArrayAsync(runners, RunnerEntity, RunnerDto);
    });
  }

  /**
   * Returns a runner based on the ID
   * @param {string} id - The ID of the runner
   * @returns {Promise<Runner>}
   * @throws {RunnerNotFoundError}
   */
  async getRunner(id: string): Promise<RunnerDto> {
    return await this.dataSource.transaction(async (manager) => {
      const runner = await manager.findOne(RunnerEntity, {
        where: { _id: id },
      });
      if (!runner) throw new RunnerNotFoundError();
      return this.mapper.mapAsync(runner, RunnerEntity, RunnerDto);
    });
  }
}

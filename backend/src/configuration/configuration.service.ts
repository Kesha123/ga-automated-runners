import { Injectable } from '@nestjs/common';
import { ConfigurationDto } from './dtos/configuration.dto';
import { Configuration } from '../data/models/configuration.model';
import { DataSource } from 'typeorm';
import { ConfigurationEntity } from '../data/entities/configuration.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ConfigurationNotFoundError } from '../errors/configuration-not-fount.error';
import { ConfigurationCreateDto } from './dtos/configuration-create.dto';
import { ConfigurationAlreadyExistsError } from '../errors/configuration-already-exists.error';
import { EC2 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { CreateAWSEnvironmentDto } from './dtos/create-aws-environment.dto';
import { AWSEnvironment } from '../data/models/aws-environment.model';
import { AWSEnvironmentDto } from './dtos/aws-environment.dto';
import { AWSEnvironmentAlreadyExistsError } from '../errors/aws-environment-already-exists.error';
import { AWSEnvironmentEntity } from '../data/entities/aws-environment.entity';
import { IntegrityViolationError } from '../errors/integrity-violation.error';
import { AWSEnvironmentNotFoundError } from '../errors/aws-environment-not-found.error';

@Injectable()
export class ConfigurationService {
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
   * Gets configuration
   * @throws {ConfigurationNotFoundError}
   * @returns {Promise<ConfigurationDto>}
   */
  async getConfiguration(): Promise<ConfigurationDto> {
    return this.dataSource.transaction(async (manager) => {
      const configurations = await manager.find(ConfigurationEntity);
      if (!configurations) throw new ConfigurationNotFoundError();
      const configuration = configurations[0];
      return this.mapper.mapAsync(
        configuration,
        ConfigurationEntity,
        ConfigurationDto,
      );
    });
  }

  /**
   * Creates configuration
   * @param {ConfigurationCreateDto} configurationCreateDto
   * @throws {ConfigurationAlreadyExistsError}
   * @returns {Promise<void>}
   */
  async createConfiguration(
    configurationCreateDto: ConfigurationCreateDto,
  ): Promise<void> {
    const configuration = await this.mapper.mapAsync(
      configurationCreateDto,
      ConfigurationCreateDto,
      ConfigurationEntity,
    );
    await this.dataSource.transaction(async (manager) => {
      const [, count] = await manager.findAndCount(ConfigurationEntity);
      if (count > 0) throw new ConfigurationAlreadyExistsError();
      await manager.save(configuration);
    });
  }

  /**
   * Updates configuration
   * @param {ConfigurationDto} configurationDto
   * @throws {ConfigurationNotFoundError}
   * @returns {Promise<void>}
   */
  async updateConfiguration(
    configurationCreateDto: ConfigurationCreateDto,
  ): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [, count] = await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      const configuration = await this.mapper.mapAsync(
        configurationCreateDto,
        ConfigurationCreateDto,
        Configuration,
      );
      await manager.update(
        ConfigurationEntity,
        { singleton: 'singleton' },
        configuration,
      );
    });
  }

  /**
   * Creates AWS environment. Key pair, Security Group, and saves Image id.
   * @param {CreateAWSEnvironmentDto} createAWSEnvironmentDto
   * @returns {Promise<AWSEnvironmentDto>}
   * @throws {ConfigurationNotFoundError} If configuration is not found
   */
  async createAWSEnvironment(
    createAWSEnvironmentDto: CreateAWSEnvironmentDto,
  ): Promise<AWSEnvironmentDto> {
    return await this.dataSource.transaction(async (manager) => {
      const [configurations, count] =
        await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      const configuration = configurations[0];
      if (configuration.awsEnvironment)
        throw new AWSEnvironmentAlreadyExistsError();
      const keyPair = await this.ec2Client
        .createKeyPair({ KeyName: createAWSEnvironmentDto.keyPairName })
        .promise();
      const securityGroup = await this.ec2Client
        .createSecurityGroup({
          GroupName: createAWSEnvironmentDto.securityGroupName,
          Description: 'Security group for GA Automated Runner',
        })
        .promise();
      console.log(securityGroup.GroupId);
      const ingressParams = {
        GroupId: securityGroup.GroupId,
        IpPermissions: [
          {
            IpProtocol: 'tcp',
            FromPort: 22,
            ToPort: 22,
            IpRanges: [{ CidrIp: '0.0.0.0/0' }],
            Ipv6Ranges: [{ CidrIpv6: '::/0' }],
          },
          {
            IpProtocol: 'icmp',
            FromPort: -1,
            ToPort: -1,
            IpRanges: [{ CidrIp: '0.0.0.0/0' }],
            Ipv6Ranges: [{ CidrIpv6: '::/0' }],
          },
          {
            IpProtocol: 'tcp',
            FromPort: 443,
            ToPort: 443,
            IpRanges: [{ CidrIp: '0.0.0.0/0' }],
            Ipv6Ranges: [{ CidrIpv6: '::/0' }],
          },
        ],
      };
      await this.ec2Client
        .authorizeSecurityGroupIngress(ingressParams)
        .promise();
      const egressParams = {
        GroupId: securityGroup.GroupId,
        IpPermissions: [
          {
            IpProtocol: 'tcp',
            FromPort: 0,
            ToPort: 65535,
            IpRanges: [{ CidrIp: '0.0.0.0/0' }],
            Ipv6Ranges: [{ CidrIpv6: '::/0' }],
          },
          {
            IpProtocol: 'udp',
            FromPort: 0,
            ToPort: 65535,
            IpRanges: [{ CidrIp: '0.0.0.0/0' }],
            Ipv6Ranges: [{ CidrIpv6: '::/0' }],
          },
          {
            IpProtocol: 'icmp',
            FromPort: -1,
            ToPort: -1,
            IpRanges: [{ CidrIp: '0.0.0.0/0' }],
            Ipv6Ranges: [{ CidrIpv6: '::/0' }],
          },
        ],
      };
      await this.ec2Client.authorizeSecurityGroupEgress(egressParams).promise();
      const awsEnvironment = new AWSEnvironmentEntity();
      awsEnvironment.keyPairId = keyPair.KeyPairId;
      awsEnvironment.securityGroupId = securityGroup.GroupId;
      awsEnvironment.imageId =
        createAWSEnvironmentDto.imageId ??
        this.configService.get<string>('AWS_AMI');
      configuration.awsEnvironment = awsEnvironment;
      await manager.save(configuration);
      return this.mapper.mapAsync(
        configuration.awsEnvironment,
        AWSEnvironment,
        AWSEnvironmentDto,
      );
    });
  }

  /**
   * Updates EC2 image id that is used for creating instances
   * @param {string} imageId
   * @returns {Promise<void>}
   * @throws {ConfigurationNotFoundError} If configuration is not found
   */
  async updateEC2ImageId(imageId: string): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [configurations, count] =
        await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      const configuration = configurations[0];
      if (!configuration.awsEnvironment)
        throw new AWSEnvironmentNotFoundError();
      configuration.awsEnvironment.imageId = imageId;
      await manager.save(configuration);
    });
  }

  /**
   * Deletes AWS environment. Key pair and Security Group
   * @returns {Promise<void>}
   * @throws {ConfigurationNotFoundError} If configuration is not found
   */
  async deleteAWSEnvironment(): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [configurations, count] =
        await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      const configuration = configurations[0];
      if (!configuration.awsEnvironment)
        throw new AWSEnvironmentNotFoundError();
      const keyPairId = configuration.awsEnvironment.keyPairId;
      const keyPairName = configuration.awsEnvironment.keyPairName;
      const securityGroupId = configuration.awsEnvironment.securityGroupId;
      configuration.awsEnvironment = null;
      await manager.save(ConfigurationEntity, configuration);
      await this.ec2Client
        .deleteKeyPair({ KeyPairId: keyPairId, KeyName: keyPairName })
        .promise()
        .catch(() => {
          throw new IntegrityViolationError();
        });
      await this.ec2Client
        .deleteSecurityGroup({
          GroupId: securityGroupId,
        })
        .promise()
        .catch(() => {
          throw new IntegrityViolationError();
        });
    });
  }
}

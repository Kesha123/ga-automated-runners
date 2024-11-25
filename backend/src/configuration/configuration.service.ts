import { Injectable } from '@nestjs/common';
import { ConfigurationDto } from './dtos/configuration.dto';
import { Configuration } from '../data/models/configuration.model';
import { DataSource } from 'typeorm';
import { ConfigurationEntity } from '../data/entities/configuration.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { AWSEnvironmentConfiguration } from '../data/models/aws-environment-configuration.model';
import { ConfigurationNotFoundError } from '../errors/configuration-not-fount.error';
import { ConfigurationCreateDto } from './dtos/configuration-create.dto';
import { ConfigurationAlreadyExistsError } from '../errors/configuration-already-exists.error';

@Injectable()
export class ConfigurationService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Gets configuration
   * @returns {Promise<ConfigurationEntity>}
   */
  async getConfiguration(): Promise<ConfigurationEntity> {
    return this.dataSource.transaction(async (manager) => {
      const configuration = await manager.findOne(ConfigurationEntity, {
        where: { singleton: 'singleton' },
      });
      if (!configuration) throw new ConfigurationNotFoundError();
      return configuration;
    });
  }

  /**
   * Creates configuration
   * @param {ConfigurationDto} configurationDto
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
   * @returns {Promise<void>}
   */
  async updateConfiguration(configurationDto: ConfigurationDto): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [, count] = await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      const configuration = await this.mapper.mapAsync(
        configurationDto,
        ConfigurationDto,
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
   * Creates an AWS environment
   * @param {EnvironmentDto} environmentDto
   * @returns {Promise<void>}
   */
  async createEnvironment(): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [configurations, count] =
        await manager.findAndCount(ConfigurationEntity);
      if (count < 1) throw new ConfigurationNotFoundError();
      // TODO: Create IAM role
      // TODO: Create IAM Policy
      // TODO: Create VPC
      const configuration = configurations[0];
      const awsEnvironment = new AWSEnvironmentConfiguration();
      awsEnvironment.VPC = 'vpc';
      awsEnvironment.iamPolicyARN = 'iam-policy';
      awsEnvironment.iamRoleARN = 'iam-role';
      configuration.awsEnvironmentConfiguration = awsEnvironment;
      await manager.save(configuration);
    });
  }
}

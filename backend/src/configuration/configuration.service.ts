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

@Injectable()
export class ConfigurationService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * Gets configuration
   * @throws {ConfigurationNotFoundError}
   * @returns {Promise<ConfigurationDto>}
   */
  async getConfiguration(id: string): Promise<ConfigurationDto> {
    return this.dataSource.transaction(async (manager) => {
      const configuration = await manager.findOne(ConfigurationEntity, {
        where: { _id: id },
      });
      if (!configuration) throw new ConfigurationNotFoundError();
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
}

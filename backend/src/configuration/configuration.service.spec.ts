import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationService } from './configuration.service';
import { ConfigurationEntity } from '../data/entities/configuration.entity';
import { DataSource } from 'typeorm';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { ConfigurationNotFoundError } from '../errors/configuration-not-fount.error';
import { ConfigurationCreateDto } from './dtos/configuration-create.dto';
import { ConfigurationAlreadyExistsError } from '../errors/configuration-already-exists.error';
import { MapperProfile } from './mapper/mapper-profile';
import { ConfigurationDto } from './dtos/configuration.dto';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  const dataSet: ConfigurationEntity[] = [];

  beforeEach(async () => {
    const dataSourceManagerMock = {
      findOne: jest.fn((entity, options) => {
        if (options.where._id === 'not-found') return null;
        else return new ConfigurationEntity();
      }),
      findAndCount: jest.fn(() => {
        return [[...dataSet], dataSet.length];
      }),
      save: jest.fn(),
      update: jest.fn(),
    };

    const dataSourceMock = {
      transaction: jest.fn((callback) => callback(dataSourceManagerMock)),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        ConfigurationService,
        { provide: DataSource, useValue: dataSourceMock },
        MapperProfile,
      ],
    }).compile();

    service = module.get<ConfigurationService>(ConfigurationService);
  });

  describe('getConfiguration', () => {
    it('should be defined', () => {
      expect(service.getConfiguration).toBeDefined();
    });

    it('should return configuration', async () => {
      const result = await service.getConfiguration('valid-id');
      expect(result).toBeInstanceOf(ConfigurationDto);
    });

    it('should throw ConfigurationNotFoundError', async () => {
      await expect(service.getConfiguration('not-found')).rejects.toThrow(
        ConfigurationNotFoundError,
      );
    });
  });

  describe('createConfiguration', () => {
    const configurationCreateDto = {} as ConfigurationCreateDto;

    it('should be defined', () => {
      expect(service.createConfiguration).toBeDefined();
    });

    it('should create configuration', async () => {
      await expect(
        service.createConfiguration(configurationCreateDto),
      ).resolves.toBeUndefined();
    });

    it('should throw ConfigurationAlreadyExistsError', async () => {
      dataSet.push(new ConfigurationEntity());
      await expect(
        service.createConfiguration(configurationCreateDto),
      ).rejects.toThrow(ConfigurationAlreadyExistsError);
    });
  });

  describe('updateConfiguration', () => {
    const configurationDto = { minNumberRunnerCount: 4 } as ConfigurationDto;

    it('should be defined', () => {
      expect(service.updateConfiguration).toBeDefined();
    });

    it('should update configuration', async () => {
      await service.getConfiguration('valid-id');
      await expect(
        service.updateConfiguration(configurationDto),
      ).resolves.toBeUndefined();
    });

    it('should throw ConfigurationNotFoundError', async () => {
      dataSet.pop();
      await expect(
        service.updateConfiguration(configurationDto),
      ).rejects.toThrow(ConfigurationNotFoundError);
    });
  });
});

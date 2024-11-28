import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationController } from './configuration.controller';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { MapperProfile } from './mapper/mapper-profile';
import { ConfigurationService } from './configuration.service';
import { HttpException } from '@nestjs/common';
import { ConfigurationNotFoundError } from '../errors/configuration-not-fount.error';
import { ConfigurationAlreadyExistsError } from '../errors/configuration-already-exists.error';
import { ConfigurationDto } from './dtos/configuration.dto';
import { ConfigurationCreateDto } from './dtos/configuration-create.dto';
import { ConfigurationEntity } from '../data/entities/configuration.entity';
import { DataSource } from 'typeorm';

describe('ConfigurationController', () => {
  let controller: ConfigurationController;
  let configurationService: ConfigurationService;
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
      controllers: [ConfigurationController],
      providers: [
        MapperProfile,
        ConfigurationService,
        { provide: DataSource, useValue: dataSourceMock },
      ],
    }).compile();

    controller = module.get<ConfigurationController>(ConfigurationController);
    configurationService =
      module.get<ConfigurationService>(ConfigurationService);
  });

  describe('getConfiguration', () => {
    it('should succeed and return ConfigurationDto', async () => {
      const id = '1';
      const configurationDto = new ConfigurationDto();
      jest
        .spyOn(configurationService, 'getConfiguration')
        .mockResolvedValue(configurationDto);
      await expect(controller.getConfiguration(id)).resolves.toEqual(
        configurationDto,
      );
    });

    it('should fail with HttpException 404', async () => {
      const id = '1';
      jest
        .spyOn(configurationService, 'getConfiguration')
        .mockRejectedValue(new ConfigurationNotFoundError());
      await expect(controller.getConfiguration(id)).rejects.toThrow(
        HttpException,
      );
      await expect(controller.getConfiguration(id)).rejects.toThrow(
        'Configuration not found',
      );
    });

    it('should fail with HttpException 500', async () => {
      const id = '1';
      jest
        .spyOn(configurationService, 'getConfiguration')
        .mockRejectedValue(new Error());
      await expect(controller.getConfiguration(id)).rejects.toThrow(
        HttpException,
      );
      await expect(controller.getConfiguration(id)).rejects.toThrow(
        'Internal server error',
      );
    });
  });

  describe('createConfiguration', () => {
    it('should succeed', async () => {
      const configurationCreateDto = new ConfigurationCreateDto();
      jest
        .spyOn(configurationService, 'createConfiguration')
        .mockResolvedValue(undefined);
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).resolves.toBeUndefined();
    });

    it('should fail with HttpException 400', async () => {
      const configurationCreateDto = new ConfigurationCreateDto();
      jest
        .spyOn(configurationService, 'createConfiguration')
        .mockRejectedValue(new Error('Invalid parameters'));
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).rejects.toThrow('Internal server error');
    });

    it('should fail with HttpException 409', async () => {
      const configurationCreateDto = new ConfigurationCreateDto();
      jest
        .spyOn(configurationService, 'createConfiguration')
        .mockRejectedValue(new ConfigurationAlreadyExistsError());
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).rejects.toThrow('Configuration already exists');
    });

    it('should fail with HttpException 500', async () => {
      const configurationCreateDto = new ConfigurationCreateDto();
      jest
        .spyOn(configurationService, 'createConfiguration')
        .mockRejectedValue(new Error());
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.createConfiguration(configurationCreateDto),
      ).rejects.toThrow('Internal server error');
    });
  });

  describe('updateConfiguration', () => {
    it('should succeed', async () => {
      const configurationDto = new ConfigurationDto();
      jest
        .spyOn(configurationService, 'updateConfiguration')
        .mockResolvedValue(undefined);
      await expect(
        controller.updateConfiguration(configurationDto),
      ).resolves.toBeUndefined();
    });

    it('should fail with HttpException 400', async () => {
      const configurationDto = new ConfigurationDto();
      jest
        .spyOn(configurationService, 'updateConfiguration')
        .mockRejectedValue(new Error('Invalid parameters'));
      await expect(
        controller.updateConfiguration(configurationDto),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.updateConfiguration(configurationDto),
      ).rejects.toThrow('Internal server error');
    });

    it('should fail with HttpException 404', async () => {
      const configurationDto = new ConfigurationDto();
      jest
        .spyOn(configurationService, 'updateConfiguration')
        .mockRejectedValue(new ConfigurationNotFoundError());
      await expect(
        controller.updateConfiguration(configurationDto),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.updateConfiguration(configurationDto),
      ).rejects.toThrow('Configuration not found');
    });

    it('should fail with HttpException 500', async () => {
      const configurationDto = new ConfigurationDto();
      jest
        .spyOn(configurationService, 'updateConfiguration')
        .mockRejectedValue(new Error());
      await expect(
        controller.updateConfiguration(configurationDto),
      ).rejects.toThrow(HttpException);
      await expect(
        controller.updateConfiguration(configurationDto),
      ).rejects.toThrow('Internal server error');
    });
  });
});

import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Configuration } from '../../data/models/configuration.model';
import { ConfigurationDto } from '../dtos/configuration.dto';
import { ConfigurationCreateDto } from '../dtos/configuration-create.dto';
import { InstanceConfigurationDto } from '../dtos/instance-configuration.dto';
import { ConfigurationEntity } from '../../data/entities/configuration.entity';
import { InstanceConfiguration } from '../../data/models/instance-configuration.model';
import { InstanceConfigurationEntity } from '../../data/entities/instance-configuration.entity';
import { AWSEnvironment } from '../../data/models/aws-environment.model';
import { AWSEnvironmentConfigurationDto } from '../dtos/environment.dto';
import { AWSEnvironmentDto } from '../dtos/aws-environment.dto';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      // Mapper: Model -> DTO
      createMap(mapper, Configuration, ConfigurationDto);
      createMap(mapper, ConfigurationEntity, ConfigurationDto);
      createMap(mapper, InstanceConfiguration, InstanceConfigurationDto);
      createMap(mapper, AWSEnvironment, AWSEnvironmentConfigurationDto);
      createMap(mapper, AWSEnvironment, AWSEnvironmentDto);

      // Mapper: DTO -> Model
      createMap(mapper, ConfigurationDto, Configuration);
      createMap(mapper, ConfigurationDto, ConfigurationEntity);
      createMap(mapper, ConfigurationCreateDto, ConfigurationEntity);
      createMap(mapper, ConfigurationCreateDto, Configuration);
      createMap(mapper, InstanceConfigurationDto, InstanceConfiguration);

      // Mapper: Model -> Entity
      createMap(mapper, Configuration, ConfigurationEntity);

      // Mapper: Entity -> Model
      createMap(mapper, ConfigurationEntity, Configuration);

      // Mapper: Dto -> Entity
      createMap(mapper, InstanceConfigurationDto, InstanceConfigurationEntity);

      // Mapper: Entity -> Dto
      createMap(mapper, InstanceConfigurationEntity, InstanceConfigurationDto);
    };
  }
}

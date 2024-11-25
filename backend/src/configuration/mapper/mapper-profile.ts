import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Configuration } from '../../data/models/configuration.model';
import { ConfigurationDto } from '../dtos/configuration.dto';
import {
  AWSEC2Configuration,
  ConfigurationEntity,
  InstanceConfiguration,
} from 'src/data/entities/configuration.entity';
import { ConfigurationCreateDto } from '../dtos/configuration-create.dto';
import { InstanceConfigurationDto } from '../dtos/instance-configuration.dto';
import { AWSEC2ConfigurationDto } from '../dtos/aws-ec2-configuration.dto';

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
      createMap(mapper, AWSEC2Configuration, AWSEC2ConfigurationDto);

      // Mapper: DTO -> Model
      createMap(mapper, ConfigurationDto, Configuration);
      createMap(mapper, ConfigurationDto, ConfigurationEntity);
      createMap(mapper, ConfigurationCreateDto, ConfigurationEntity);
      createMap(mapper, InstanceConfigurationDto, InstanceConfiguration);
      createMap(mapper, AWSEC2ConfigurationDto, AWSEC2Configuration);

      // Mapper: Model -> Entity
      createMap(mapper, Configuration, ConfigurationEntity);

      // Mapper: Entity -> Model
      createMap(mapper, ConfigurationEntity, Configuration);
    };
  }
}

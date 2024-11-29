import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Runner } from '../../data/models/runner.model';
import { RunnerEntity } from '../../data/entities/runner.entity';
import { RunnerDto } from '../dtos/runner.dto';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      // Mapper: Model -> Entity
      createMap(mapper, Runner, RunnerEntity);

      // Mapper: Entity -> Model
      createMap(mapper, RunnerEntity, Runner);

      // Mapper: Model -> DTO
      createMap(mapper, Runner, RunnerDto);

      // Mapper: DTO -> Model
      createMap(mapper, RunnerDto, Runner);

      // Mapper: DTO -> Entity
      createMap(mapper, RunnerDto, RunnerEntity);

      // Mapper: Entity -> DTO
      createMap(mapper, RunnerEntity, RunnerDto);
    };
  }
}

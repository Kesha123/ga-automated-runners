import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Runner } from '../../data/models/runner.model';
import { RunnerEntity } from '../../data/entities/runner.entity';

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
    };
  }
}

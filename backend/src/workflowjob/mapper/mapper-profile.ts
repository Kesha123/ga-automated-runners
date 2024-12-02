import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import WorkflowJobEntity from '../../data/entities/workflow-job.entity';
import { WorkflowJobDto } from '../dtos/workflow-job.dto';
import { WorkflowJob } from 'src/data/models/workflow-job.model';

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      // Mapper: Model -> DTO
      createMap(mapper, WorkflowJob, WorkflowJobDto);

      // Mapper: DTO -> Model
      createMap(mapper, WorkflowJobDto, WorkflowJob);

      // Mapper: Model -> Entity
      createMap(mapper, WorkflowJob, WorkflowJobEntity);

      // Mapper: Entity -> Model
      createMap(mapper, WorkflowJobEntity, WorkflowJob);

      // Mapper: DTO -> Entity
      createMap(mapper, WorkflowJobDto, WorkflowJobEntity);

      // Mapper: Entity -> DTO
      createMap(mapper, WorkflowJobEntity, WorkflowJobDto);
    };
  }
}

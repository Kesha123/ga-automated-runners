import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import Organization from '../../models/organization.model';
import { OrganizationDto } from '../dtos/organization.dto';
import Repository from '../../models/repository.model';
import { RepositoryDto } from '../dtos/repository.dto';
import Sender from '../../models/sender.model';
import { SenderDto } from '../dtos/sender.dto';
import Step from '../../models/step.model';
import { StepDto } from '../dtos/step.dto';
import { WorkflowJobPayload } from '../../models/workflow-job-payload.model';
import { WorkflowJobPayloadDto } from '../dtos/workflow-job-payload.dto';
import WorkflowJob from '../../models/workflow-job.model';
import { WorkflowJobDto } from '../dtos/workflow-job.dto';

@Injectable()
export class ActionWebHookMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      // Mapper: Model -> DTO
      createMap(mapper, Organization, OrganizationDto);
      createMap(mapper, Repository, RepositoryDto);
      createMap(mapper, Sender, SenderDto);
      createMap(mapper, Step, StepDto);
      createMap(mapper, WorkflowJobPayload, WorkflowJobPayloadDto);
      createMap(mapper, WorkflowJob, WorkflowJobDto);

      // Mapper: DTO -> Model
      createMap(mapper, OrganizationDto, Organization);
      createMap(mapper, RepositoryDto, Repository);
      createMap(mapper, SenderDto, Sender);
      createMap(mapper, StepDto, Step);
      createMap(mapper, WorkflowJobPayloadDto, WorkflowJobPayload);
      createMap(mapper, WorkflowJobDto, WorkflowJob);
    };
  }
}

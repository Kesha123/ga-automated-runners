import { IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { OrganizationDto } from './organization.dto';
import { RepositoryDto } from './repository.dto';
import { SenderDto } from './sender.dto';
import { WorkflowJobDto } from './workflow-job.dto';
import { AutoMap } from '@automapper/classes';
import { WorkflowJobPayload } from 'src/models/workflow-job-payload.model';

export class WorkflowJobPayloadDto implements WorkflowJobPayload {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  action: string;

  @AutoMap()
  @ValidateNested()
  @Type(() => WorkflowJobDto)
  workflow_job: WorkflowJobDto;

  @AutoMap()
  @ValidateNested()
  @Type(() => RepositoryDto)
  repository: RepositoryDto;

  @AutoMap()
  @ValidateNested()
  @Type(() => OrganizationDto)
  organization: OrganizationDto;

  @AutoMap()
  @ValidateNested()
  @Type(() => SenderDto)
  sender: SenderDto;
}

import { IsString, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { OrganizationDto } from './organization.dto';
import { RepositoryDto } from './repository.dto';
import { SenderDto } from './sender.dto';
import { WorkflowJobDto } from './workflow-job.dto';
import { AutoMap } from '@automapper/classes';
import { WorkflowJobPayload } from '../../data/models/workflow-job-payload.model';
import Action from '../../data/models/workflow-job-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class WorkflowJobPayloadDto implements WorkflowJobPayload {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    enum: Action,
  })
  action: Action;

  @AutoMap()
  @ValidateNested()
  @Type(() => WorkflowJobDto)
  @ApiProperty({
    type: () => WorkflowJobDto,
  })
  workflow_job: WorkflowJobDto;

  @AutoMap()
  @ValidateNested()
  @Type(() => RepositoryDto)
  @ApiProperty({
    type: () => RepositoryDto,
  })
  repository: RepositoryDto;

  @AutoMap()
  @ValidateNested()
  @Type(() => OrganizationDto)
  @ApiProperty({
    type: () => OrganizationDto,
  })
  organization: OrganizationDto;

  @AutoMap()
  @ValidateNested()
  @Type(() => SenderDto)
  @ApiProperty({
    type: () => SenderDto,
  })
  sender: SenderDto;
}

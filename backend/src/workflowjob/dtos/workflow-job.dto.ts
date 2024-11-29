import {
  IsString,
  IsNumber,
  IsEnum,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import WorkflowJobConclusion from '../../data/models/workflow-job-conclusion.enum';
import WorkflowJobStatus from '../../data/models/workflow-job-status.enum';
import { StepDto } from './step.dto';
import { AutoMap } from '@automapper/classes';

export class WorkflowJobDto {
  @AutoMap()
  @IsNumber()
  id: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  run_id: number | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  run_url: string;

  @AutoMap()
  @IsNumber()
  run_attempt: number;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  node_id: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  head_sha: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  url: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  html_url: string;

  @AutoMap()
  @IsEnum(WorkflowJobStatus)
  status: WorkflowJobStatus;

  @AutoMap()
  @IsEnum(WorkflowJobConclusion)
  @IsOptional()
  conclusion: WorkflowJobConclusion | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  started_at: string | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  completed_at: string | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @AutoMap()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  steps: StepDto[];

  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  labels: string[];

  @AutoMap()
  @IsNumber()
  @IsOptional()
  runner_id: number | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  runner_name: string | null;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  runner_group_id: number | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  runner_group_name: string | null;
}

import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import WorkflowJobConclusion from 'src/data/models/workflow-job-conclusion.enum';
import WorkflowJobStatus from 'src/data/models/workflow-job-status.enum';
import { AutoMap } from '@automapper/classes';

export class StepDto {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @AutoMap()
  @IsEnum(WorkflowJobStatus)
  status: WorkflowJobStatus;

  @AutoMap()
  @IsEnum(WorkflowJobConclusion)
  @IsOptional()
  conclusion: WorkflowJobConclusion | null;

  @AutoMap()
  @IsNumber()
  number: number;

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
}

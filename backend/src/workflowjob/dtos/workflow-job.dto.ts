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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkflowJobDto {
  @AutoMap()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  id: number;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
  })
  run_id: number | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  run_url: string;

  @AutoMap()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  run_attempt: number;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  node_id: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  head_sha: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  url: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  html_url: string;

  @AutoMap()
  @IsEnum(WorkflowJobStatus)
  @ApiProperty({
    enum: WorkflowJobStatus,
  })
  status: WorkflowJobStatus;

  @AutoMap()
  @IsEnum(WorkflowJobConclusion)
  @IsOptional()
  @ApiPropertyOptional({
    enum: WorkflowJobConclusion,
  })
  conclusion: WorkflowJobConclusion | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
  })
  started_at: string | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
  })
  completed_at: string | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  name: string;

  @AutoMap()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  @ApiProperty({
    type: () => [StepDto],
    isArray: true,
  })
  steps: StepDto[];

  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    isArray: true,
    example: ['self-hosted', 'aws-ec2'],
  })
  labels: string[];

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
  })
  runner_id: number | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  runner_name: string | null;

  @AutoMap()
  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
  })
  runner_group_id: number | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  runner_group_name: string | null;
}

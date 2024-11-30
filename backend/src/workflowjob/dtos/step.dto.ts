import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import WorkflowJobConclusion from '../../data/models/workflow-job-conclusion.enum';
import WorkflowJobStatus from '../../data/models/workflow-job-status.enum';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StepDto {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  name: string;

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
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  number: number;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  started_at: string | null;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : value))
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
  })
  completed_at: string | null;
}

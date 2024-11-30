import { AutoMap } from '@automapper/classes';
import RunnerStatus from '../../data/models/runner-status.enum';
import {
  IsEnum,
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RunnerDto {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    description: 'database index',
  })
  _id: string;

  @AutoMap()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'GitHub assigned id from workflow job',
  })
  id: number;

  @AutoMap()
  @IsEnum(RunnerStatus)
  @ApiProperty({
    enum: RunnerStatus,
  })
  status: RunnerStatus;

  @AutoMap()
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    isArray: true,
    example: ['self-hosted', 'aws-ec2'],
  })
  labels: string[];

  @AutoMap()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  current_job_id: number;

  @AutoMap()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  next_job_id: number;

  @AutoMap()
  @IsDateString()
  @ApiProperty({
    type: String,
    format: 'date-time',
  })
  created_at: string;

  @AutoMap()
  @IsDateString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    format: 'date-time',
  })
  updated_at: string;

  @AutoMap()
  @IsDateString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    format: 'date-time',
  })
  shutdown_at: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  urn: string | null;
}

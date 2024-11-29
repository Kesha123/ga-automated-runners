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

export class RunnerDto {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  _id: string;

  @AutoMap()
  @IsNumber()
  id: number;

  @AutoMap()
  @IsEnum(RunnerStatus)
  status: RunnerStatus;

  @AutoMap()
  @IsString({ each: true })
  labels: string[];

  @AutoMap()
  @IsNumber()
  current_job_id: number;

  @AutoMap()
  @IsNumber()
  next_job_id: number;

  @AutoMap()
  @IsDateString()
  created_at: string;

  @AutoMap()
  @IsDateString()
  @Transform(({ value }) => value.trim())
  updated_at: string;

  @AutoMap()
  @IsDateString()
  @Transform(({ value }) => value.trim())
  shutdown_at: string;

  @AutoMap()
  @IsOptional()
  @IsString()
  urn: string | null;
}

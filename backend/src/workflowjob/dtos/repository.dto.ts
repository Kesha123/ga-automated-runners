import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class RepositoryDto {
  @AutoMap()
  @IsNumber()
  id: number;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  full_name: string;

  @AutoMap()
  @IsBoolean()
  private: boolean;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  html_url: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  description: string | null;
}

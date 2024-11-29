import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class OrganizationDto {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  login: string;

  @AutoMap()
  @IsNumber()
  id: number;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  url: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  repos_url: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  description: string | null;
}

import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

export class SenderDto {
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
  avatar_url: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  html_url: string;
}

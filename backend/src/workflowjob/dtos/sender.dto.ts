import { IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class SenderDto {
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  login: string;

  @AutoMap()
  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  id: number;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  avatar_url: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  html_url: string;
}

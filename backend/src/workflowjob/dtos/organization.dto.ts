import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrganizationDto {
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
  url: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  repos_url: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  @ApiPropertyOptional({
    type: String,
  })
  description: string | null;
}

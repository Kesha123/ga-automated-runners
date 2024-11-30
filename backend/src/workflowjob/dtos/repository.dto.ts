import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RepositoryDto {
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
  name: string;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  full_name: string;

  @AutoMap()
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
  })
  private: boolean;

  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
  })
  html_url: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : value))
  @ApiPropertyOptional({
    type: String,
  })
  description: string | null;
}

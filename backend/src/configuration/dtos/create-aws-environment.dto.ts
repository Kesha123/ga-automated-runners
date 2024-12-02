import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAWSEnvironmentDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Transform(({ value }) => value.trim())
  keyPairName: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Transform(({ value }) => value.trim())
  securityGroupName: string;

  @AutoMap()
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, required: false })
  @Transform(({ value }) => value.trim())
  imageId?: string;
}

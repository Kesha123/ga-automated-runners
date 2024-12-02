import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class AWSEnvironmentDto {
  @ApiProperty({
    type: String,
  })
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  keyPairId: string;

  @ApiProperty({
    type: String,
  })
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  keyPairName: string;

  @ApiProperty({
    type: String,
  })
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  securityGroupId: string;

  @ApiProperty({
    type: String,
  })
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  imageId: string;

  @ApiProperty({
    type: String,
  })
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  instanceType: string;
}

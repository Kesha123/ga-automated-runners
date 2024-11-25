import { AutoMap } from '@automapper/classes';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AWSEnvironmentConfigurationDto {
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  iamRoleARN: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  iamPolicyARN: string;

  @AutoMap()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  VPC: string;
}

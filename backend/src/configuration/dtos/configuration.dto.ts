import { AutoMap } from '@automapper/classes';
import {
  IsInt,
  ValidateNested,
  Min,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InstanceConfigurationDto } from './instance-configuration.dto';
import { AWSEC2ConfigurationDto } from './aws-ec2-configuration.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ConfigurationDto {
  @ApiProperty({
    type: Number,
    minimum: 0,
  })
  @AutoMap()
  @IsInt()
  @Min(0)
  minNumberRunnerCount: number;

  @ApiProperty({
    type: () => InstanceConfigurationDto,
    description: 'Instance configuration details',
  })
  @AutoMap(() => InstanceConfigurationDto)
  @ValidateNested()
  @Type(() => InstanceConfigurationDto)
  instanceConfiguration: InstanceConfigurationDto;

  @ApiProperty({
    type: () => AWSEC2ConfigurationDto,
    description: 'AWS EC2 instance configuration details',
  })
  @AutoMap(() => AWSEC2ConfigurationDto)
  @ValidateNested()
  @Type(() => AWSEC2ConfigurationDto)
  awsec2Configuration: AWSEC2ConfigurationDto;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: false,
  })
  @AutoMap()
  @IsOptional()
  @IsDateString()
  created_at?: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    required: false,
  })
  @AutoMap()
  @IsOptional()
  @IsDateString()
  updated_at?: string;
}

import { AutoMap } from '@automapper/classes';
import {
  IsInt,
  IsString,
  IsArray,
  IsDateString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ConfigurationDto {
  @AutoMap()
  @IsInt()
  @Min(0)
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfigurationDto)
  @ValidateNested()
  @Type(() => InstanceConfigurationDto)
  instanceConfiguration: InstanceConfigurationDto;

  @AutoMap(() => AWSEC2ConfigurationDto)
  @ValidateNested()
  @Type(() => AWSEC2ConfigurationDto)
  awsec2Configuration: AWSEC2ConfigurationDto;

  @AutoMap(() => VagrantConfigurationDto)
  @ValidateNested()
  @Type(() => VagrantConfigurationDto)
  vagrantConfiguration: VagrantConfigurationDto;

  @AutoMap(() => DockerConfigurationDto)
  @ValidateNested()
  @Type(() => DockerConfigurationDto)
  dockerConfiguration: DockerConfigurationDto;

  @AutoMap()
  @IsDateString()
  created_at: string;

  @AutoMap()
  @IsDateString()
  updated_at: string;
}

export class InstanceConfigurationDto {
  @AutoMap()
  @IsInt()
  @Min(0)
  minVCPU: number;

  @AutoMap()
  @IsInt()
  @Min(0)
  maxVCPU: number;

  @AutoMap()
  @IsInt()
  @Min(0)
  minRAM: number;

  @AutoMap()
  @IsInt()
  @Min(0)
  maxRAM: number;
}

export class AWSEC2ConfigurationDto {
  @AutoMap()
  @IsInt()
  @Min(0)
  minNumberRunnerCount: number;

  @AutoMap()
  @IsString()
  region: string;
}

export class VagrantConfigurationDto {
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  nodePool: string[]; // Array of IP addresses
}

export class DockerConfigurationDto {
  @AutoMap()
  @IsArray()
  @IsString({ each: true })
  nodePool: string[]; // Array of IP addresses
}

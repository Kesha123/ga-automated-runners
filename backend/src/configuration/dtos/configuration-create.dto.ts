import { AutoMap } from '@automapper/classes';
import { IsInt, ValidateNested, Min, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { InstanceConfigurationDto } from './instance-configuration.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ConfigurationCreateDto {
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
    type: String,
  })
  @AutoMap()
  @IsString()
  @Transform(({ value }) => value.trim())
  githubRepo: string;
}

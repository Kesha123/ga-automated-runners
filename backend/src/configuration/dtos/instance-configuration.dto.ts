import { AutoMap } from '@automapper/classes';
import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InstanceConfigurationDto {
  @AutoMap()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, minimum: 0 })
  minVCPU: number;

  @AutoMap()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, minimum: 0 })
  maxVCPU: number;

  @AutoMap()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, minimum: 0 })
  minRAM: number;

  @AutoMap()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, minimum: 0 })
  maxRAM: number;
}

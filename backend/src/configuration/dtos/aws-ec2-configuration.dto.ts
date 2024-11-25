import { AutoMap } from '@automapper/classes';
import { IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AWSEC2ConfigurationDto {
  @AutoMap()
  @IsInt()
  @Min(0)
  @ApiProperty({ type: Number, minimum: 0 })
  minNumberRunnerCount: number;

  @AutoMap()
  @IsString()
  @ApiProperty({ type: String })
  region: string;
}

import { AutoMap } from '@automapper/classes';

export class InstanceConfiguration {
  @AutoMap()
  minVCPU: number;

  @AutoMap()
  maxVCPU: number;

  @AutoMap()
  minRAM: number;

  @AutoMap()
  maxRAM: number;
}

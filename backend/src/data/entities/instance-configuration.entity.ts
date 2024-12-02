import { AutoMap } from '@automapper/classes';
import { Column } from 'typeorm';
import { InstanceConfiguration } from '../models/instance-configuration.model';

export class InstanceConfigurationEntity implements InstanceConfiguration {
  @AutoMap()
  @Column()
  minVCPU: number;

  @AutoMap()
  @Column()
  maxVCPU: number;

  @AutoMap()
  @Column()
  minRAM: number;

  @AutoMap()
  @Column()
  maxRAM: number;
}

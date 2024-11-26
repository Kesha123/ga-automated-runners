import { AutoMap } from '@automapper/classes';
import {
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  Entity,
} from 'typeorm';
import { Configuration } from '../models/configuration.model';

export class AWSEC2Configuration {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectId;

  @AutoMap()
  @Column()
  minNumberRunnerCount: number;

  @AutoMap()
  @Column()
  region: string;
}

export class AWSEnvironmentConfiguration {
  @AutoMap()
  @Column()
  iamRoleARN: string;

  @AutoMap()
  @Column()
  iamPolicyARN: string;

  @AutoMap()
  @Column()
  VPC: string;
}

export class InstanceConfiguration {
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

@Entity('configuration')
export class ConfigurationEntity implements Configuration {
  @AutoMap()
  @ObjectIdColumn()
  _id: string;

  @AutoMap()
  @Column()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfiguration)
  @Column()
  instanceConfiguration: InstanceConfiguration;

  @AutoMap(() => AWSEC2Configuration)
  @Column()
  awsec2Configuration: AWSEC2Configuration;

  @AutoMap()
  @CreateDateColumn()
  created_at: string;

  @AutoMap()
  @CreateDateColumn()
  updated_at: string;
}

import { AutoMap } from '@automapper/classes';
import {
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  Entity,
  Index,
} from 'typeorm';
import { Configuration } from '../models/configuration.model';

export class AWSEC2Configuration {
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
@Index(['singleton'], { unique: true })
export class ConfigurationEntity implements Configuration {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  singleton: string = 'singleton';

  @AutoMap()
  @Column()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfiguration)
  @Column()
  instanceConfiguration: InstanceConfiguration;

  @AutoMap(() => AWSEC2Configuration)
  @Column()
  awsec2Configuration: AWSEC2Configuration;

  @AutoMap(() => AWSEnvironmentConfiguration)
  @Column()
  awsEnvironmentConfiguration: AWSEnvironmentConfiguration;

  @AutoMap()
  @CreateDateColumn()
  created_at: string;

  @AutoMap()
  @CreateDateColumn()
  updated_at: string;
}

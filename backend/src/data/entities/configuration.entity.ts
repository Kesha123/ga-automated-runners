import { AutoMap } from '@automapper/classes';
import {
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { Configuration } from '../models/configuration.model';
import { AWSEnvironmentEntity } from './aws-environment.entity';
import { InstanceConfigurationEntity } from './instance-configuration.entity';

@Entity('configuration')
export class ConfigurationEntity implements Configuration {
  @AutoMap()
  @ObjectIdColumn({
    primary: true,
  })
  _id: string;

  @AutoMap()
  @Column()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfigurationEntity)
  @Column(() => InstanceConfigurationEntity)
  instanceConfiguration: InstanceConfigurationEntity;

  @AutoMap(() => AWSEnvironmentEntity)
  @Column({ nullable: true })
  awsEnvironment: AWSEnvironmentEntity | null;

  @AutoMap()
  @Column()
  githubRepo: string;

  @AutoMap()
  @CreateDateColumn()
  created_at: string;

  @AutoMap()
  @UpdateDateColumn()
  updated_at: string;
}

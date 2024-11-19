import { AutoMap } from '@automapper/classes';
import { ObjectId, ObjectIdColumn, Column, CreateDateColumn } from 'typeorm';

export class Congiguration {
  @ObjectIdColumn()
  _id: ObjectId;

  @AutoMap()
  @Column()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfiguration)
  @Column()
  instanceConfiguration: InstanceConfiguration;

  @AutoMap(() => AWSEC2Configuration)
  @Column()
  awsec2Configuration: AWSEC2Configuration;

  @AutoMap(() => VagrantConfiuration)
  @Column()
  vagrantConfiguration: VagrantConfiuration;

  @AutoMap(() => DockerConfiguration)
  @Column()
  dockerConfiguration: DockerConfiguration;

  @AutoMap()
  @CreateDateColumn()
  created_at: string;

  @AutoMap()
  @CreateDateColumn()
  updated_at: string;
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

export class AWSEC2Configuration {
  @AutoMap()
  @Column()
  minNumberRunnerCount: number;

  @AutoMap()
  @Column()
  region: string;
}

export class VagrantConfiuration {
  @AutoMap()
  @Column()
  nodePool: string[]; // Array of IP addresses
}

export class DockerConfiguration {
  @AutoMap()
  @Column()
  nodePool: string[]; // Array of IP addresses
}

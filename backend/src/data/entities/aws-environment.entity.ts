import { AutoMap } from '@automapper/classes';
import { Column } from 'typeorm';
import { AWSEnvironment } from '../models/aws-environment.model';

export class AWSEnvironmentEntity implements AWSEnvironment {
  @AutoMap()
  @Column()
  keyPairId: string;

  @AutoMap()
  @Column()
  keyPairName: string;

  @AutoMap()
  @Column()
  securityGroupId: string;

  @AutoMap()
  @Column()
  imageId: string;

  @AutoMap()
  @Column()
  instanceType: string;
}

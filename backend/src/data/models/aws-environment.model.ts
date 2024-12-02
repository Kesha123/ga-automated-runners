import { AutoMap } from '@automapper/classes';

export class AWSEnvironment {
  @AutoMap()
  keyPairName: string;

  @AutoMap()
  securityGroupId: string;

  @AutoMap()
  imageId: string;

  @AutoMap()
  instanceType: string;
}

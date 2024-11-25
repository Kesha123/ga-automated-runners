import { AutoMap } from '@automapper/classes';

export class AWSEnvironmentConfiguration {
  @AutoMap()
  iamRoleARN: string;

  @AutoMap()
  iamPolicyARN: string;

  @AutoMap()
  VPC: string;
}

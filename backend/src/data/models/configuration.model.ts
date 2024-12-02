import { AutoMap } from '@automapper/classes';
import { InstanceConfiguration } from './instance-configuration.model';
import { AWSEnvironment } from './aws-environment.model';

export class Configuration {
  @AutoMap()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfiguration)
  instanceConfiguration: InstanceConfiguration;

  @AutoMap(() => AWSEnvironment)
  awsEnvironment: AWSEnvironment | null;

  @AutoMap()
  githubRepo: string;

  @AutoMap()
  created_at: string;

  @AutoMap()
  updated_at: string;
}

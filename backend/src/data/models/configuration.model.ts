import { AutoMap } from '@automapper/classes';
import { InstanceConfiguration } from './instance-configuration.model';
import { AWSEC2Configuration } from './aws-ec2-configuration.model';

export class Configuration {
  @AutoMap()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfiguration)
  instanceConfiguration: InstanceConfiguration;

  @AutoMap(() => AWSEC2Configuration)
  awsec2Configuration: AWSEC2Configuration;

  @AutoMap()
  created_at: string;

  @AutoMap()
  updated_at: string;
}

import { AutoMap } from '@automapper/classes';

export class Configuration {
  @AutoMap()
  minNumberRunnerCount: number;

  @AutoMap(() => InstanceConfiguration)
  instanceConfiguration: InstanceConfiguration;

  @AutoMap(() => AWSEC2Configuration)
  awsec2Configuration: AWSEC2Configuration;

  @AutoMap(() => VagrantConfiuration)
  vagrantConfiguration: VagrantConfiuration;

  @AutoMap(() => DockerConfiguration)
  dockerConfiguration: DockerConfiguration;

  @AutoMap()
  created_at: string;

  @AutoMap()
  updated_at: string;
}

export class InstanceConfiguration {
  @AutoMap()
  minVCPU: number;

  @AutoMap()
  maxVCPU: number;

  @AutoMap()
  minRAM: number;

  @AutoMap()
  maxRAM: number;
}

export class AWSEC2Configuration {
  @AutoMap()
  minNumberRunnerCount: number;

  @AutoMap()
  region: string;
}

export class VagrantConfiuration {
  @AutoMap()
  nodePool: string[]; // Array of IP addresses
}

export class DockerConfiguration {
  @AutoMap()
  nodePool: string[]; // Array of IP addresses
}

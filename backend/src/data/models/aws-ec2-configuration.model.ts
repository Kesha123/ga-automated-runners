import { AutoMap } from '@automapper/classes';

export class AWSEC2Configuration {
  @AutoMap()
  minNumberRunnerCount: number;

  @AutoMap()
  region: string;
}

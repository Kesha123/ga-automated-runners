import { AutoMap } from '@automapper/classes';
import RunnerOS from './runner-os.enum';
import RunnerStatus from './runner-status.enum';

class Runner {
  @AutoMap()
  id: string;

  @AutoMap()
  status: RunnerStatus;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  os: RunnerOS;

  @AutoMap()
  labels: string[];
}

export default Runner;

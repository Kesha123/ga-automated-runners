import { AutoMap } from '@automapper/classes';
import RunnerStatus from './runner-status.enum';

export class Runner {
  @AutoMap()
  status: RunnerStatus;

  @AutoMap()
  labels: string[];

  @AutoMap()
  current_job_id: number;

  @AutoMap()
  next_job_id: number;

  @AutoMap()
  created_at: string;

  @AutoMap()
  updated_at: string;

  @AutoMap()
  shutdown_at: string;

  @AutoMap()
  urn: string | null;
}

import { AutoMap } from '@automapper/classes';
import RunnerStatus from './runner-status.enum';

export class Runner {
  @AutoMap()
  _id: string;

  @AutoMap()
  id: number;

  @AutoMap()
  status: RunnerStatus;

  @AutoMap()
  labels: string[];

  @AutoMap()
  current_job_id: number;

  @AutoMap()
  next_job_id: number;

  @AutoMap()
  created_at: Date;

  @AutoMap()
  updated_at: Date;

  @AutoMap()
  shutdown_at: Date;

  @AutoMap()
  urn: string | null;
}

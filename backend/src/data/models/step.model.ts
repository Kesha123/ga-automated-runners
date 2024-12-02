import { AutoMap } from '@automapper/classes';
import WorkflowJobConclusion from './workflow-job-conclusion.enum';
import WorkflowJobStatus from './workflow-job-status.enum';

export class Step {
  @AutoMap()
  name: string;

  @AutoMap()
  status: WorkflowJobStatus;

  @AutoMap()
  conclusion: WorkflowJobConclusion | null;

  @AutoMap()
  number: number;

  @AutoMap()
  started_at: string | null;

  @AutoMap()
  completed_at: string | null;
}

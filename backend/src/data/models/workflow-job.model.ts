import { Step } from './step.model';
import WorkflowJobConclusion from './workflow-job-conclusion.enum';
import WorkflowJobStatus from './workflow-job-status.enum';
import { AutoMap } from '@automapper/classes';

export class WorkflowJob {
  @AutoMap()
  id: number;

  @AutoMap()
  run_id: number;

  @AutoMap()
  run_url: string;

  @AutoMap()
  run_attempt: number;

  @AutoMap()
  node_id: string;

  @AutoMap()
  head_sha: string;

  @AutoMap()
  url: string;

  @AutoMap()
  html_url: string;

  @AutoMap()
  status: WorkflowJobStatus;

  @AutoMap()
  conclusion: WorkflowJobConclusion | null;

  @AutoMap()
  started_at: string | null;

  @AutoMap()
  completed_at: string | null;

  @AutoMap()
  name: string;

  @AutoMap(() => Step)
  steps: Step[];

  @AutoMap()
  labels: string[];

  @AutoMap()
  runner_id: number | null;

  @AutoMap()
  runner_name: string | null;

  @AutoMap()
  runner_group_id: number | null;

  @AutoMap()
  runner_group_name: string | null;
}

import { AutoMap } from '@automapper/classes';
import Organization from './organization.model';
import Repository from './repository.model';
import Sender from './sender.model';
import WorkflowJob from './workflow-job.model';

export class WorkflowJobPayload {
  @AutoMap()
  action: string;

  @AutoMap()
  workflow_job: WorkflowJob;

  @AutoMap()
  repository: Repository;

  @AutoMap()
  organization: Organization;

  @AutoMap()
  sender: Sender;
}

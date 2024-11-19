import { AutoMap } from '@automapper/classes';
import Organization from './organization.model';
import Repository from './repository.model';
import Sender from './sender.model';
import WorkflowJob from './workflow-job.model';
import Action from './workflow-job-status.enum';

export class WorkflowJobPayload {
  @AutoMap()
  action: Action;

  @AutoMap()
  workflow_job: WorkflowJob;

  @AutoMap()
  repository: Repository;

  @AutoMap()
  organization: Organization;

  @AutoMap()
  sender: Sender;
}

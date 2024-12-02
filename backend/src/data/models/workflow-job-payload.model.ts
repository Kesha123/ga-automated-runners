import { AutoMap } from '@automapper/classes';
import Action from './workflow-job-status.enum';
import { Repository } from './repository.model';
import { Organization } from './organization.model';
import { Sender } from './sender.model';
import { WorkflowJob } from './workflow-job.model';

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

import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { InvalidEnvironmentError } from 'src/errors/invalid-environment.error';
import { WorkflowjobService } from '../workflowjob/workflowjob.service';
import { WorkflowJobPayload } from '../data/models/workflow-job-payload.model';

@Processor('workflow-job')
export class WorkflowJobConsumer extends WorkerHost {
  constructor(private workflowJobService: WorkflowjobService) {
    super();
  }

  process(job: Job, token?: string): Promise<void> {
    console.log(token);
    const data = job.data as WorkflowJobPayload;
    switch (job.name) {
      case 'runner-control':
        this.workflowJobService.handleJob(data.action, data.workflow_job);
        return;
      default:
        throw new InvalidEnvironmentError();
    }
  }
}

import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { InvalidEnvironmentError } from "src/errors/invalid-environment.error";
import { ActionWebhookService } from "./action-webhook.service";

@Processor('workflow-job')
export class WorkflowJobConsumer extends WorkerHost {
  constructor(private actionWebhookService: ActionWebhookService) {
    super();
  }

  process(job: Job, token?: string): Promise<void> {
    switch (job.name) {
      case 'runner-control':
        this.actionWebhookService.handleJob(job)
        return;
      default:
        throw new InvalidEnvironmentError();
    }
  }
}

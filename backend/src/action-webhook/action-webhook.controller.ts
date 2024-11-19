import { Body, Controller, Post } from '@nestjs/common';
import { ActionWebhookService } from './action-webhook.service';
import { WorkflowJobPayloadDto } from './dtos/workflow-job-payload.dto';

@Controller('action-webhook')
export class ActionWebhookController {
  constructor(private actionWebhookService: ActionWebhookService) {}

  @Post()
  async workflowJobHandler(
    @Body() workflowJobPayloadDto: WorkflowJobPayloadDto,
  ) {
    this.actionWebhookService.queueWorkflowJobAction(workflowJobPayloadDto);
  }
}

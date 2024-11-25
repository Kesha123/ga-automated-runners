import { Controller } from '@nestjs/common';
import { Get, Param } from '@nestjs/common';
import { WorkflowjobService } from './workflowjob.service';

@Controller('workflowjob')
export class WorkflowjobController {
  constructor(private readonly workflowjobService: WorkflowjobService) {}

  @Get(':id')
  async getWorkflowJob(@Param('id') id: number) {
    return this.workflowjobService.getWorkflowJob(id);
  }
}

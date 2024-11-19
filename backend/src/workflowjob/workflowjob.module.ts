import { Module } from '@nestjs/common';
import { WorkflowjobController } from './workflowjob.controller';
import { WorkflowjobService } from './workflowjob.service';

@Module({
  controllers: [WorkflowjobController],
  providers: [WorkflowjobService],
})
export class WorkflowjobModule {}

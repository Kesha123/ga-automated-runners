import { Module } from '@nestjs/common';
import { WorkflowjobController } from './workflowjob.controller';
import { WorkflowjobService } from './workflowjob.service';
import { RunnerModule } from 'src/runner/runner.module';

@Module({
  imports: [RunnerModule],
  controllers: [WorkflowjobController],
  providers: [WorkflowjobService],
  exports: [WorkflowjobService],
})
export class WorkflowjobModule {}

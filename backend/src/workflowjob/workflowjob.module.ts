import { Module } from '@nestjs/common';
import { WorkflowjobController } from './workflowjob.controller';
import { WorkflowjobService } from './workflowjob.service';
import { RunnerModule } from '../runner/runner.module';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { DataModule } from '../data/data.module';

@Module({
  imports: [
    RunnerModule,
    DataModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [WorkflowjobController],
  providers: [WorkflowjobService],
  exports: [WorkflowjobService],
})
export class WorkflowjobModule {}

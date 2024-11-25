import { Module } from '@nestjs/common';
import { ActionWebhookController } from './action-webhook.controller';
import { ActionWebhookService } from './action-webhook.service';
import { DataModule } from 'src/data/data.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from './mapper/mapper-profile';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowJobConsumer } from './workflow-job.consumer';
import { WorkflowjobModule } from 'src/workflowjob/workflowjob.module';

@Module({
  controllers: [ActionWebhookController],
  providers: [ActionWebhookService, MapperProfile, WorkflowJobConsumer],
  imports: [
    DataModule,
    WorkflowjobModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    BullModule.registerQueueAsync({
      name: 'workflow-job',
    }),
  ],
  exports: [ActionWebhookModule],
})
export class ActionWebhookModule {}

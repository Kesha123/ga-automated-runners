import { Module } from '@nestjs/common';
import { ActionWebhookController } from './action-webhook.controller';
import { ActionWebhookService } from './action-webhook.service';
import { DataModule } from 'src/data/data.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ActionWebHookMapperProfile } from './mapper/mapper-profile';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowJobConsumer } from './workflow-job.consumer';

@Module({
  controllers: [ActionWebhookController],
  providers: [ActionWebhookService, ActionWebHookMapperProfile, WorkflowJobConsumer],
  imports: [
    DataModule,
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

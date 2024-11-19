import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ActionWebhookModule } from './action-webhook/action-webhook.module';
import { DataModule } from './data/data.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { ConfigurationModule } from './configuration/configuration.module';
import { RunnerModule } from './runner/runner.module';
import { WorkflowjobModule } from './workflowjob/workflowjob.module';

@Module({
  imports: [
    ActionWebhookModule,
    DataModule,
    ConfigurationModule,
    RunnerModule,
    WorkflowjobModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}

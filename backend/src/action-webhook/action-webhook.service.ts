import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { WorkflowJobPayload } from '../data/models/workflow-job-payload.model';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { WorkflowJobPayloadDto } from './dtos/workflow-job-payload.dto';

@Injectable()
export class ActionWebhookService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectQueue('workflow-job') private workflowJobQueue: Queue,
  ) {}

  async queueWorkflowJobAction(workflowJobPayloadDto: WorkflowJobPayloadDto) {
    const workflowJobPayload = await this.mapper.mapAsync(
      workflowJobPayloadDto,
      WorkflowJobPayloadDto,
      WorkflowJobPayload,
    );
    this.dataSource.transaction(async (manager) => {
      await manager.save(workflowJobPayload);
      await this.workflowJobQueue.add('runner-control', workflowJobPayload);
    });
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WorkflowJobPayloadDto } from './dtos/workflow-job-payload.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { WorkflowJobPayload } from 'src/models/workflow-job-payload.model';
import { InjectQueue } from '@nestjs/bullmq';
import { Job, Queue } from 'bullmq';
import WorkflowJobStatus from 'src/models/workflow-job-status.enum';
import { UnknownJobStatusError } from 'src/errors/ulnown-job-status.error';

@Injectable()
export class ActionWebhookService {
  constructor(
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
    @InjectQueue('workflow-job') private workflowJobQueue: Queue,
  ) {}

  async addWorkflowJobToQueue(workflowJobPayloadDto: WorkflowJobPayloadDto) {
    const workflowJobPayload = await this.mapper.mapAsync(
      workflowJobPayloadDto,
      WorkflowJobPayloadDto,
      WorkflowJobPayload,
    );
    this.dataSource.transaction(async manager => {
      await manager.save(workflowJobPayload);
      await this.workflowJobQueue.add('runner-control', workflowJobPayload);
    });
  }

  async handleJob(job: Job) {
    const workflowJob = job.data as WorkflowJobPayload;
    switch (workflowJob.action) {
      case WorkflowJobStatus.queued:
        // spin up vm as runner
        break;
      case WorkflowJobStatus.in_progress:
        break;
      case WorkflowJobStatus.completed:
        // update status of the job
        // check queue, if jobs keep runner (or there are minimum number of runners required), or remove runner.
        break;
      default:
        throw new UnknownJobStatusError();
    }
  }

  async createEC2Runner() {}

  async createDockerRunner() {}

  async createVMRunner() {}
}

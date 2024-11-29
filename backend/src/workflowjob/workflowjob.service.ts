import { Injectable } from '@nestjs/common';
import { RunnerService } from '../runner/runner.service';
import Action from '../data/models/workflow-job-status.enum';
import WorkflowJob from '../data/models/workflow-job.model';
import { WorkflowJobDto } from './dtos/workflow-job.dto';
import { DataSource } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WorkflowJobNotFoundError } from '../errors/workflow-job-not-found.error';

@Injectable()
export class WorkflowjobService {
  constructor(
    private readonly runnerService: RunnerService,
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async handleJob(action: Action, workflowJob: WorkflowJob): Promise<void> {
    // Logic to handle a job based on the provided action and workflow job details
    console.log(`Handling job with action: ${action}`, workflowJob);
  }

  async handleQueuedJob(workflowJob: WorkflowJob): Promise<void> {
    // Logic to handle queued jobs
    console.log(`Handling queued job`, workflowJob);
  }

  async handleWaitingJob(workflowJob: WorkflowJob): Promise<void> {
    // Logic to handle waiting jobs
    console.log(`Handling waiting job`, workflowJob);
  }

  async handleInProgressJob(workflowJob: WorkflowJob): Promise<void> {
    // Logic to handle in-progress jobs
    console.log(`Handling in-progress job`, workflowJob);
  }

  async handleCompletedJob(workflowJob: WorkflowJob): Promise<void> {
    // Logic to handle completed jobs
    console.log(`Handling completed job`, workflowJob);
  }

  /**
   * Retrieves a workflow job by its ID
   * @param {number} id
   * @returns {Promise<WorkflowJobDto>}
   * @throws {WorkflowJobNotFoundError} Thrown when the workflow job is not found
   */
  async getWorkflowJob(id: number): Promise<WorkflowJobDto> {
    return await this.dataSource.transaction(async (manager) => {
      const workflowJob = await manager.findOne(WorkflowJob, { where: { id } });
      if (!workflowJob) throw new WorkflowJobNotFoundError();
      return this.mapper.map(workflowJob, WorkflowJobDto, WorkflowJob);
    });
  }

  /**
   * Retrieves all workflow jobs
   * @returns {Promise<WorkflowJobDto[]>}
   */
  async getWorkflowJobs(): Promise<WorkflowJobDto[]> {
    return await this.dataSource.transaction(async (manager) => {
      const workflowJobs = await manager.find(WorkflowJob);
      return this.mapper.mapArray(workflowJobs, WorkflowJobDto, WorkflowJob);
    });
  }
}

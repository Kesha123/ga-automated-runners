import { Injectable } from '@nestjs/common';
import { RunnerService } from '../runner/runner.service';
import Action from '../data/models/workflow-job-status.enum';
import WorkflowJob from '../data/models/workflow-job.model';
import { WorkflowJobDto } from './dtos/workflow-job.dto';
import { DataSource, In } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { WorkflowJobNotFoundError } from '../errors/workflow-job-not-found.error';
import { WorkflowJobActionUnknownError } from '../errors/workflow-job-action-unknown.error';
import { RunnerEntity } from '../data/entities/runner.entity';
import { IntegrityViolationError } from '../errors/integrity-violation.error';
import RunnerStatus from '../data/models/runner-status.enum';
import WorkflowJobEntity from '../data/entities/workflow-job.entity';

@Injectable()
export class WorkflowjobService {
  constructor(
    private readonly runnerService: RunnerService,
    private dataSource: DataSource,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  /**
   * An interface to handle workflow jobs with different actions
   * @param {Action} action
   * @param {WorkflowJob} workflowJob
   * @returns {Promise<void>}
   * @throws {WorkflowJobActionUnknownError} Thrown when the action is unknown
   */
  async handleJob(action: Action, workflowJob: WorkflowJob): Promise<void> {
    switch (action) {
      case Action.Queued:
        await this.handleQueuedJob(workflowJob);
        break;
      case Action.Waiting:
        await this.handleWaitingJob(workflowJob);
        break;
      case Action.In_progress:
        await this.handleInProgressJob(workflowJob);
        break;
      case Action.Completed:
        await this.handleCompletedJob(workflowJob);
        break;
      default:
        throw new WorkflowJobActionUnknownError();
    }
  }

  /**
   * Handles a queued job.
   * This method is responsible for updating the runner's status and labels.
   * @param {WorkflowJob} workflowJob
   * @returns {Promise<void>}
   */
  async handleQueuedJob(workflowJob: WorkflowJob): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const [, count] = await manager.findAndCount(RunnerEntity, {
        where: { status: RunnerStatus.Online, labels: In(workflowJob.labels) },
      });
      const job = this.mapper.map(workflowJob, WorkflowJob, WorkflowJobEntity);
      if (count === 0)
        await this.runnerService.spinUpRunner(1, workflowJob.labels);
      await manager.save(job);
    });
  }

  /**
   * Handles a waiting job.
   * This method is responsible for updating the runner's next job ID.
   * @param {WorkflowJob} workflowJob
   * @returns {Promise<void>}
   * @throws {IntegrityViolationError} Thrown when the runner is not found
   * @throws {WorkflowJobNotFoundError} Thrown when the workflow job is not found
   */
  async handleWaitingJob(workflowJob: WorkflowJob): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const runners = await manager.find(RunnerEntity, {
        where: { id: workflowJob.run_id },
      });
      if (runners.length !== 1) throw new IntegrityViolationError();
      const runner = runners[0];
      runner.next_job_id = workflowJob.id;
      await manager.save(runner);
    });
    await this.dataSource.transaction(async (manager) => {
      const job = await manager.findOne(WorkflowJob, {
        where: { id: workflowJob.id },
      });
      if (!job) throw new WorkflowJobNotFoundError();
      job.status = Action.Waiting;
      await manager.save(job);
    });
  }

  /**
   * Handles an in-progress job.
   * This method is responsible for updating the runner's current job ID.
   * @param {WorkflowJob} workflowJob
   * @returns {Promise<void>}
   * @throws {IntegrityViolationError} Thrown when the runner is not found
   * @throws {WorkflowJobNotFoundError} Thrown when the workflow job is not found
   */
  async handleInProgressJob(workflowJob: WorkflowJob): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const runners = await manager.find(RunnerEntity, {
        where: { id: workflowJob.run_id },
      });
      if (runners.length !== 1) throw new IntegrityViolationError();
      const runner = runners[0];
      runner.next_job_id = null;
      runner.current_job_id = workflowJob.id;
      await manager.save(runner);
    });
    await this.dataSource.transaction(async (manager) => {
      const job = await manager.findOne(WorkflowJob, {
        where: { id: workflowJob.id },
      });
      if (!job) throw new WorkflowJobNotFoundError();
      job.status = Action.In_progress;
      await manager.save(job);
    });
  }

  /**
   * Handles a completed job.
   * This method is responsible for updating the runner's next job ID.
   * @param {WorkflowJob} workflowJob
   * @returns {Promise<void>}
   * @throws {IntegrityViolationError} Thrown when the runner is not found
   */
  async handleCompletedJob(workflowJob: WorkflowJob): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const runners = await manager.find(RunnerEntity, {
        where: { id: workflowJob.run_id },
      });
      if (runners.length !== 1) throw new IntegrityViolationError();
      const runner = runners[0];
      if (
        !runner.next_job_id &&
        this.runnerService.isProperNumberOfRunners(RunnerStatus.Online)
      ) {
        this.runnerService.shutDownRunner(1, workflowJob.labels);
      }
    });
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

import { Injectable } from '@nestjs/common';
import { RunnerService } from '../runner/runner.service';
import Action from '../models/workflow-job-status.enum';
import WorkflowJob from 'src/models/workflow-job.model';

@Injectable()
export class WorkflowjobService {
  constructor(private readonly runnerService: RunnerService) {}

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

  async getWorkflowJob(id: number, args?: WorkflowJob): Promise<WorkflowJob[]> {
    // Logic to retrieve workflow jobs based on the provided id and optional arguments
    console.log(`Retrieving workflow job with id: ${id}`, args);
    // Placeholder for actual implementation
    return [];
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowjobService } from './workflowjob.service';
import { DataSource } from 'typeorm';
import { WorkflowJobActionUnknownError } from '../errors/workflow-job-action-unknown.error';
import { RunnerService } from '../runner/runner.service';
import { MapperProfile } from './mapper/mapper-profile';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import Action from '../data/models/workflow-job-status.enum';
import { WorkflowJob } from '../data/models/workflow-job.model';

describe('WorkflowjobService', () => {
  let service: WorkflowjobService;
  let runnerService: RunnerService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        WorkflowjobService,
        {
          provide: RunnerService,
          useValue: { spinUpRunner: jest.fn() },
        },
        {
          provide: DataSource,
          useValue: { transaction: jest.fn() },
        },
        MapperProfile,
      ],
    }).compile();

    service = module.get<WorkflowjobService>(WorkflowjobService);
    runnerService = module.get<RunnerService>(RunnerService);
    dataSource = module.get<DataSource>(DataSource);
    console.log(runnerService, dataSource);
  });

  describe('handleJob', () => {
    it('should handle queued job', async () => {
      jest.spyOn(service, 'handleQueuedJob').mockResolvedValue();
      await service.handleJob(Action.Queued, {} as WorkflowJob);
      expect(service.handleQueuedJob).toHaveBeenCalled();
    });

    it('should handle waiting job', async () => {
      jest.spyOn(service, 'handleWaitingJob').mockResolvedValue();
      await service.handleJob(Action.Waiting, {} as WorkflowJob);
      expect(service.handleWaitingJob).toHaveBeenCalled();
    });

    it('should handle in progress job', async () => {
      jest.spyOn(service, 'handleInProgressJob').mockResolvedValue();
      await service.handleJob(Action.In_progress, {} as WorkflowJob);
      expect(service.handleInProgressJob).toHaveBeenCalled();
    });

    it('should handle completed job', async () => {
      jest.spyOn(service, 'handleCompletedJob').mockResolvedValue();
      await service.handleJob(Action.Completed, {} as WorkflowJob);
      expect(service.handleCompletedJob).toHaveBeenCalled();
    });

    it('should throw error for unknown action', async () => {
      await expect(
        service.handleJob('unknown' as Action, {} as WorkflowJob),
      ).rejects.toThrow(WorkflowJobActionUnknownError);
    });
  });

  describe('handleQueuedJob', () => {
    it('should handle queued job', async () => {});
  });

  describe('handleWaitingJob', () => {
    it('should handle waiting job', async () => {});

    it('should throw IntegrityViolationError if runner not found', async () => {});
  });

  describe('handleCompletedJob', () => {
    it('should throw IntegrityViolationError if runner is not found', async () => {});

    it('should call shutDownRunner if no next job and proper number of runners', async () => {});

    it('should not call shutDownRunner if there is a next job', async () => {});

    it('should not call shutDownRunner if improper number of runners', async () => {});
  });
});

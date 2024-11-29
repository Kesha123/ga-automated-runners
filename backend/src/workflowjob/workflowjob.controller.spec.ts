import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowjobController } from './workflowjob.controller';
import { WorkflowjobService } from './workflowjob.service';
import { WorkflowJobDto } from './dtos/workflow-job.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('WorkflowjobController', () => {
  let controller: WorkflowjobController;
  let service: WorkflowjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowjobController],
      providers: [
        {
          provide: WorkflowjobService,
          useValue: {
            getWorkflowJobs: jest.fn(),
            getWorkflowJob: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkflowjobController>(WorkflowjobController);
    service = module.get<WorkflowjobService>(WorkflowjobService);
  });

  describe('getWorkflowJobs', () => {
    it('should return an array of workflow jobs', async () => {
      const workflowJobs = [new WorkflowJobDto(), new WorkflowJobDto()];
      jest.spyOn(service, 'getWorkflowJobs').mockResolvedValue(workflowJobs);
      expect(await controller.getWorkflowJobs()).toBe(workflowJobs);
    });

    it('should throw a 500 error if there is an unexpected error', async () => {
      jest
        .spyOn(service, 'getWorkflowJobs')
        .mockRejectedValue(
          new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.getWorkflowJobs();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('getWorkflowJob', () => {
    it('should return a workflow job if found', async () => {
      const workflowJob = new WorkflowJobDto();
      jest.spyOn(service, 'getWorkflowJob').mockResolvedValue(workflowJob);
      expect(await controller.getWorkflowJob(1)).toBe(workflowJob);
    });

    it('should throw a 404 error if workflow job not found', async () => {
      jest
        .spyOn(service, 'getWorkflowJob')
        .mockRejectedValue(
          new HttpException('Not found', HttpStatus.NOT_FOUND),
        );
      try {
        await controller.getWorkflowJob(1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should throw a 500 error for other errors', async () => {
      jest
        .spyOn(service, 'getWorkflowJob')
        .mockRejectedValue(
          new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.getWorkflowJob(1);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});

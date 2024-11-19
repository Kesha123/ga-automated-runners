import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowjobController } from './workflowjob.controller';

describe('WorkflowjobController', () => {
  let controller: WorkflowjobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowjobController],
    }).compile();

    controller = module.get<WorkflowjobController>(WorkflowjobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

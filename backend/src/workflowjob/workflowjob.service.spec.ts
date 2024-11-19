import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowjobService } from './workflowjob.service';

describe('WorkflowjobService', () => {
  let service: WorkflowjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowjobService],
    }).compile();

    service = module.get<WorkflowjobService>(WorkflowjobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

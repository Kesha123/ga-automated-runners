import { Test, TestingModule } from '@nestjs/testing';
import { ActionWebhookService } from './action-webhook.service';
import { DataSource } from 'typeorm';
import { MapperProfile } from './mapper/mapper-profile';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { WorkflowJobPayloadDto } from './dtos/workflow-job-payload.dto';

describe('ActionWebhookService', () => {
  let service: ActionWebhookService;
  const queue = [];

  beforeEach(async () => {
    const mockQueue = {
      add: jest.fn((queueName, payload) => {
        queue.push(payload);
      }),
    };

    const module = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [
        ActionWebhookService,
        { provide: DataSource, useValue: { transaction: jest.fn() } },
        MapperProfile,
        { provide: 'BullQueue_workflow-job', useValue: mockQueue },
      ],
    }).compile();

    service = module.get<ActionWebhookService>(ActionWebhookService);
  });

  describe('queueWorkflowJobAction', () => {
    const workflowJobPayloadDto = {} as WorkflowJobPayloadDto;
    it('should succeed', async () => {
      await expect(
        service.queueWorkflowJobAction(workflowJobPayloadDto),
      ).resolves.toBeUndefined();
    });
  });
});

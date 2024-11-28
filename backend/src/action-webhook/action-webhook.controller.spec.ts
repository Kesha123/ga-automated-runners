import { Test, TestingModule } from '@nestjs/testing';
import { ActionWebhookController } from './action-webhook.controller';
import { ActionWebhookService } from './action-webhook.service';
import { WorkflowJobPayloadDto } from './dtos/workflow-job-payload.dto';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('ActionWebhookController', () => {
  let app: INestApplication;
  let controller: ActionWebhookController;
  let service: ActionWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionWebhookController],
      providers: [
        {
          provide: ActionWebhookService,
          useValue: {
            queueWorkflowJobAction: jest.fn(),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<ActionWebhookController>(ActionWebhookController);
    service = module.get<ActionWebhookService>(ActionWebhookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call queueWorkflowJobAction with correct parameters', async () => {
    const workflowJobPayloadDto = new WorkflowJobPayloadDto();
    const queueWorkflowJobActionSpy = jest.spyOn(
      service,
      'queueWorkflowJobAction',
    );

    await request(app.getHttpServer())
      .post('/action-webhook')
      .send(workflowJobPayloadDto)
      .expect(201);

    expect(queueWorkflowJobActionSpy).toHaveBeenCalledWith(
      workflowJobPayloadDto,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});

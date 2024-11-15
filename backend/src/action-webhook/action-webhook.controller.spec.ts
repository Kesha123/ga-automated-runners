import { Test, TestingModule } from '@nestjs/testing';
import { ActionWebhookController } from './action-webhook.controller';

describe('ActionWebhookController', () => {
  let controller: ActionWebhookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActionWebhookController],
    }).compile();

    controller = module.get<ActionWebhookController>(ActionWebhookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

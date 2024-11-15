import { Test, TestingModule } from '@nestjs/testing';
import { ActionWebhookService } from './action-webhook.service';

describe('ActionWebhookService', () => {
  let service: ActionWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionWebhookService],
    }).compile();

    service = module.get<ActionWebhookService>(ActionWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async health(): Promise<string> {
    return 'ok';
  }
}

import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';

@Module({
  controllers: [RunnerController],
  providers: [RunnerService],
})
export class RunnerModule {}

import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';
import { DataModule } from 'src/data/data.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from './mapper/mapper-profile';

@Module({
  imports: [
    DataModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [RunnerController],
  providers: [RunnerService, MapperProfile],
  exports: [RunnerService],
})
export class RunnerModule {}

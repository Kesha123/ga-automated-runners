import { Module } from '@nestjs/common';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';
import { DataModule } from 'src/data/data.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { MapperProfile } from './mapper/mapper-profile';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'aws-sdk';

@Module({
  imports: [
    DataModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule,
  ],
  controllers: [RunnerController],
  providers: [RunnerService, MapperProfile, ConfigService],
  exports: [RunnerService],
})
export class RunnerModule {}

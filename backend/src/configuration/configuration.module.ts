import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { DataModule } from '../data/data.module';
import { MapperProfile } from './mapper/mapper-profile';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DataModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule,
  ],
  providers: [ConfigurationService, MapperProfile, ConfigService],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}

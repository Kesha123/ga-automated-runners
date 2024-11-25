import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { DataModule } from '../data/data.module';
import { MapperProfile } from './mapper/mapper-profile';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    DataModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [ConfigurationService, MapperProfile],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}

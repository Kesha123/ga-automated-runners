import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getConfiguration(): Promise<Configuration> {
    return this.configurationService.getConfiguration();
  }

  @Post()
  async createConfiguration(
    @Body() configurationDto: ConfigurationDto,
  ): Promise<void> {
    return this.configurationService.createConfiguration(configurationDto);
  }

  @Put()
  async updateConfiguration(
    @Body() configurationDto: ConfigurationDto,
  ): Promise<void> {
    return this.configurationService.updateConfiguration(configurationDto);
  }
}

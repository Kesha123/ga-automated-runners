import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationDto } from './dtos/configuration.dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ConfigurationNotFoundError } from '../errors/configuration-not-fount.error';
import { ConfigurationCreateDto } from './dtos/configuration-create.dto';
import { ConfigurationAlreadyExistsError } from '../errors/configuration-already-exists.error';
import { AWSEnvironmentDto } from './dtos/aws-environment.dto';
import { CreateAWSEnvironmentDto } from './dtos/create-aws-environment.dto';

@ApiTags('configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(
    private readonly configurationService: ConfigurationService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get configuration' })
  @ApiOkResponse({
    description: 'The configuration has been successfully retrieved.',
    type: ConfigurationDto,
  })
  @ApiNotFoundResponse({ description: 'Configuration not found.' })
  async getConfiguration(@Param() id: string): Promise<ConfigurationDto> {
    try {
      const configuration =
        await this.configurationService.getConfiguration(id);
      return configuration;
    } catch (error) {
      if (error instanceof ConfigurationNotFoundError) {
        throw new HttpException(
          'Configuration not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create configuration' })
  @ApiBody({ type: ConfigurationCreateDto })
  @ApiResponse({
    status: 201,
    description: 'The configuration has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  @ApiResponse({
    status: 409,
    description: 'The configuration already exists.',
  })
  async createConfiguration(
    @Body() configurationCreateDto: ConfigurationCreateDto,
  ): Promise<void> {
    try {
      await this.configurationService.createConfiguration(
        configurationCreateDto,
      );
      return;
    } catch (error) {
      if (error instanceof ConfigurationAlreadyExistsError) {
        throw new HttpException(
          'Configuration already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  @ApiOperation({ summary: 'Update configuration' })
  @ApiBody({ type: ConfigurationDto })
  @ApiResponse({
    status: 200,
    description: 'The configuration has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Configuration does not exist.' })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  async updateConfiguration(
    @Body() configurationCreateDto: ConfigurationCreateDto,
  ): Promise<void> {
    try {
      await this.configurationService.updateConfiguration(
        configurationCreateDto,
      );
      return;
    } catch (error) {
      if (error instanceof ConfigurationNotFoundError) {
        throw new HttpException(
          'Configuration not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('environment')
  @ApiOperation({
    summary:
      'Create AWS environment configuration. Key pair, Security Group, and saves Image id.',
  })
  @ApiBody({ type: CreateAWSEnvironmentDto })
  @ApiResponse({
    status: 200,
    description:
      'The AWS environment configuration has been successfully created.',
    type: AWSEnvironmentDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  async createAWSEnvironment(
    @Body() createAWSEnvironmentDto: CreateAWSEnvironmentDto,
  ): Promise<AWSEnvironmentDto> {
    try {
      await this.configurationService.createAWSEnvironment(
        createAWSEnvironmentDto,
      );
      return;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('environment/image/:id')
  @ApiOperation({ summary: 'Update image id' })
  @ApiResponse({
    status: 201,
    description: 'The image id has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Configuration does not exist.' })
  @ApiResponse({ status: 400, description: 'Invalid parameters.' })
  async updateEC2ImageId(@Param() id: string): Promise<void> {
    try {
      await this.configurationService.updateEC2ImageId(id);
      return;
    } catch (error) {
      if (error instanceof ConfigurationNotFoundError) {
        throw new HttpException(
          'Configuration not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('environment')
  @ApiOperation({ summary: 'Delete AWS environment configuration' })
  @ApiResponse({
    status: 200,
    description:
      'The AWS environment configuration has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Configuration does not exist.' })
  async deleteAWSEnvironment(): Promise<void> {
    try {
      await this.configurationService.deleteAWSEnvironment();
      return;
    } catch (error) {
      if (error instanceof ConfigurationNotFoundError) {
        throw new HttpException(
          'Configuration not found',
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

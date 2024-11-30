import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RunnerService } from './runner.service';
import { RunnerNotFoundError } from '../errors/runner-not-found.error';
import { RunnerDto } from './dtos/runner.dto';

@ApiTags('runner')
@Controller('runner')
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Get()
  @ApiOperation({ summary: 'Get all runners' })
  @ApiResponse({
    status: 200,
    description: 'Return all runners',
    type: [RunnerDto],
  })
  async getAllRunners(): Promise<RunnerDto[]> {
    return this.runnerService.getRunners();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get runner by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return runner by ID',
    type: RunnerDto,
  })
  @ApiResponse({ status: 404, description: 'Runner not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getRunnerById(@Param('id') id: string): Promise<RunnerDto> {
    try {
      return this.runnerService.getRunner(id);
    } catch (error) {
      if (error instanceof RunnerNotFoundError) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      } else {
        console.error(error);
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

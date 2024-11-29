import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkflowjobService } from './workflowjob.service';
import { WorkflowJobDto } from './dtos/workflow-job.dto';
import { WorkflowJobNotFoundError } from '../errors/workflow-job-not-found.error';

@ApiTags('workflowjob')
@Controller('workflowjob')
export class WorkflowjobController {
  constructor(private readonly workflowjobService: WorkflowjobService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workflow jobs' })
  @ApiResponse({
    status: 200,
    description: 'Return all workflow jobs',
    type: [WorkflowJobDto],
  })
  @ApiResponse({ status: 500, description: 'Internal service error' })
  async getWorkflowJobs(): Promise<WorkflowJobDto[]> {
    return this.workflowjobService.getWorkflowJobs();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workflow job by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return workflow job by ID',
    type: WorkflowJobDto,
  })
  @ApiResponse({ status: 404, description: 'Workflow job not found' })
  @ApiResponse({ status: 500, description: 'Internal service error' })
  async getWorkflowJob(@Param('id') id: number): Promise<WorkflowJobDto> {
    try {
      return this.workflowjobService.getWorkflowJob(id);
    } catch (error) {
      if (error instanceof WorkflowJobNotFoundError) {
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

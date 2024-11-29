import { Test, TestingModule } from '@nestjs/testing';
import { RunnerController } from './runner.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RunnerService } from './runner.service';
import { RunnerDto } from './dtos/runner.dto';

describe('RunnerController', () => {
  let controller: RunnerController;
  let runnerService: RunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunnerController],
      providers: [
        {
          provide: RunnerService,
          useValue: {
            getRunner: jest.fn(),
            getRunners: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RunnerController>(RunnerController);
    runnerService = module.get<RunnerService>(RunnerService);
  });

  describe('getRunnerById', () => {
    it('should return a runner if found', async () => {
      const runner = new RunnerDto();
      jest.spyOn(runnerService, 'getRunner').mockResolvedValue(runner);
      expect(await controller.getRunnerById('1')).toBe(runner);
    });

    it('should throw a 404 error if runner not found', async () => {
      jest
        .spyOn(runnerService, 'getRunner')
        .mockRejectedValue(
          new HttpException('Not found', HttpStatus.NOT_FOUND),
        );
      try {
        await controller.getRunnerById('1');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should throw a 500 error for other errors', async () => {
      jest
        .spyOn(runnerService, 'getRunner')
        .mockRejectedValue(
          new HttpException(
            'Unexpected error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.getRunnerById('1');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });

  describe('getAllRunners', () => {
    it('should return an array of runners', async () => {
      const runners = [new RunnerDto(), new RunnerDto()];
      jest.spyOn(runnerService, 'getRunners').mockResolvedValue(runners);
      expect(await controller.getAllRunners()).toBe(runners);
    });

    it('should throw a 500 error if there is an unexpected error', async () => {
      jest
        .spyOn(runnerService, 'getRunners')
        .mockRejectedValue(
          new HttpException(
            'Unexpected error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
      try {
        await controller.getAllRunners();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});

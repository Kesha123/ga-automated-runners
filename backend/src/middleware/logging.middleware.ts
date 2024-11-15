import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name, {
    timestamp: true,
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`${req.method} ${req.baseUrl}`);
    this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`);
    this.logger.debug(`Request: ${JSON.stringify(req.body)}`);
    next();
  }
}

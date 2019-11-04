import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

// Modules.
import { createLogger } from '../modules/logger';

export class RequestError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

const logger: Logger = createLogger();

/**
 * Simple error handling middleware.
 */
export default function errorHandler(
  error: Error | RequestError | undefined,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void {
  if (error) {
    logger.error(error.message);

    if (error instanceof RequestError) {
      return response.status(error.status)
        .json({
          message: error.message,
          status: error.status,
        });
    }
  }

  next(error);
}

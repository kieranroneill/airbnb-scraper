import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

export class RequestError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

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
    winston.error(error.message);

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

/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { BaseError } from './BaseError';

async function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof BaseError) {
    return res.send({ errors: err.serializeErrors() });
  }
  res.send({ errors: [{ message: 'An error occurred' }] });
}

export default errorMiddleware;

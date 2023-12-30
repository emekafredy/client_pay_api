/* eslint-disable  @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { BaseError } from './BaseError';
import { StatusCodes } from '../../types/statusCodes';
import { logger } from '../Logger';

export const handleError = async (
  err: Error,
  _req: Request = null,
  res: Response = null,
) => {
  await logger.error('Error:', err);

  res
    .status(StatusCodes.INTERNAL_SERVER)
    .send({ success: false, message: 'An error occurred' });
};

async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof BaseError) {
    const statusCode =
      err.serializeErrors()[0]?.status || StatusCodes.INTERNAL_SERVER;
    return res.status(statusCode).send(err.serializeErrors());
  }

  await handleError(err, req, res);
}

export default errorMiddleware;

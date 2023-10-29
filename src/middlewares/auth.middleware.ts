import { NextFunction, Request, Response } from 'express';
import { verifyJWTToken } from '../utils';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User.entity';
import { StatusCodes } from '../types/statusCodes';

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) throw new UnauthorizedError();

  const token = header.split(' ')[1];
  if (!token) throw new UnauthorizedError();

  const decoded = verifyJWTToken(token);
  if (!decoded) throw new UnauthorizedError();

  req['userId'] = decoded;

  next();
};

export const authorizeUser = (user_types: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req['userId'].id },
    });

    if (!user_types.includes(user.user_type))
      throw new UnauthorizedError(StatusCodes.FORBIDDEN);

    next();
  };
};

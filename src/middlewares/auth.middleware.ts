import { NextFunction, Request, Response } from 'express';
import { verifyJWTToken, handleGetRepository } from '../utils';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import { User } from '../entities/User.entity';
import { StatusCodes } from '../types/statusCodes';

export const authenticateUser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) throw new UnauthorizedError(StatusCodes.UNAUTHORIZED);

  const token = header.split(' ')[1];
  if (!token) throw new UnauthorizedError(StatusCodes.UNAUTHORIZED);

  const decoded = verifyJWTToken(token);
  if (!decoded) throw new UnauthorizedError(StatusCodes.UNAUTHORIZED);

  req['user'] = decoded;

  next();
};

export const authorizeUser = (user_types: string[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const userRepository = handleGetRepository(User);
    const user = await userRepository.findOne({
      where: { id: req['user'].sub },
    });

    if (!user_types.includes(user.user_type))
      throw new UnauthorizedError(StatusCodes.FORBIDDEN);

    next();
  };
};

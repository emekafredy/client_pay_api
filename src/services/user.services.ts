import { BaseError } from '../lib/errors/BaseError';
import { AppDataSource } from '../data-source';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entities/User.entity';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import NotFoundError from '../lib/errors/NotFoundError';
import redisClient from '../lib/redis';
import { redisConfig } from '../config';

const userRepository = AppDataSource.getRepository(User);

export const getUserProfile = async (req: Request, res: Response) => {
  if (!req['userId']) throw new UnauthorizedError();

  const user = await userRepository.findOne({
    where: { id: req[' currentUser'].id },
  });

  if (!user) throw new NotFoundError('User');
  return user;
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.find();
  await redisClient.set('users', JSON.stringify(users), {
    EX: redisConfig.redisCacheExpiresIn,
    NX: true,
  });

  return users;
};

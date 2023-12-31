import { Request } from 'express';
import { User } from '../entities/User.entity';
import UnauthorizedError from '../lib/errors/UnauthorizedError';
import NotFoundError from '../lib/errors/NotFoundError';
import redisClient from '../lib/redis';
import { redisConfig } from '../config';
import { handleGetRepository } from '../utils';

const userRepository = handleGetRepository(User);

export const getUserProfile = async (req: Request) => {
  if (!req['user']) throw new UnauthorizedError();

  const user = await userRepository.findOne({
    where: { id: req['user'].sub },
  });

  if (!user) throw new NotFoundError('User');
  return user;
};

export const getUsers = async () => {
  const users = await userRepository.find();
  await redisClient.set('users', JSON.stringify(users), {
    EX: redisConfig.redisCacheExpiresIn,
    NX: true,
  });

  return users;
};

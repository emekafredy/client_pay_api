import { NextFunction, Request, Response } from 'express';
import redisClient from '../lib/redis';

export const getCachedUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cacheResults = await redisClient.get('users');
    if (cacheResults) {
      const users = await JSON.parse(cacheResults);
      return res
        .status(200)
        .json({ message: 'Users fetched', fromCache: true, data: users });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

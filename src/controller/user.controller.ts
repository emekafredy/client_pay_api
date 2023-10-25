import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entity/User';
import { createUser } from '../services/user.services';

const userRepository = AppDataSource.getRepository(User);

export const allUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.find();
  res.send(users);
};

export const saveUser = async (req: Request, res: Response) => {
  const result = await createUser(req, res);
  res.send(result);
};

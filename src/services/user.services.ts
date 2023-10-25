import APIError from '../errors/APIError';
import { BaseError } from '../errors/BaseError';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

export const findByEmail = async (email: string) => {
  const user = await userRepository.findOne({ where: { email } });
  return user;
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, image_url } = req.body;

  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new APIError('Email already exists', 'email');
  }

  try {
    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      image_url,
    });

    const result = await userRepository.save(user);
    return result;
  } catch (err) {
    res.status((<BaseError>err)?.errorCode || 500).send('Error saving user');
  }
};

import BadRequestError from '../lib/errors/BadRequestError';
import { BaseError } from '../lib/errors/BaseError';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { User } from '../entities/User.entity';
import { StatusCodes } from '../types/statusCodes';
import { authCredentials } from '../config';
import { generateJWTToken, handleGetRepository } from '../utils';

const userRepository = handleGetRepository(User);

export const findByEmail = async (email: string) => {
  const user = await userRepository.findOne({ where: { email } });
  return user;
};

export const createUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    user_type,
    image_url,
    country,
  } = req.body;

  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new BadRequestError(
      'email',
      StatusCodes.ALREADY_EXISTS,
      'Email already exists',
    );
  }

  const newUser = Object.assign(new User(), {
    firstName,
    lastName,
    email,
    password,
    user_type,
    image_url,
    country,
  });

  const user = await userRepository.save(newUser);
  const token = generateJWTToken({ sub: user.id });

  return { user, token };
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await findByEmail(email);
  if (
    !existingUser ||
    !(await User.comparePasswords(password, existingUser.password))
  ) {
    throw new BadRequestError(
      '',
      StatusCodes.BAD_REQUEST,
      'Invalid email or password',
    );
  }

  const token = generateJWTToken({ sub: existingUser.id });

  return { existingUser, token };
};

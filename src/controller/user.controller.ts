import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { BaseError } from "../errors/BaseError";
import APIError from "../errors/APIError";
import { createUser } from "../services/user.services";

const userRepository = AppDataSource.getRepository(User);

export const allUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await userRepository.find();
  res.send(users);
};

export const saveUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await createUser(req, res);
  res.send(result);
};

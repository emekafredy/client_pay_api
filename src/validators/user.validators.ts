import Joi from "joi";
import { NextFunction, Response } from "express";
import { StatusCodes } from "../types/statusCodes";

export const validateInput = (
  req: { body: { firstName: string; lastName: string; age: number } },
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().min(3).required().email(),
    image_url: Joi.string().min(3).required(),
  }).options({ abortEarly: false });

  const validation = schema.validate(body);

  if (validation.error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      errors: validation.error.details,
    });
    return;
  }
  next();
};

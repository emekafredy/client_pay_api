import Joi from 'joi';
import { NextFunction, Response } from 'express';
import { StatusCodes } from '../types/statusCodes';

export const validateInput = (
  req: { body: { firstName: string; lastName: string; age: number } },
  res: Response,
  next: NextFunction,
) => {
  const body = req.body;
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(6).max(30).required(),
    user_type: Joi.string().required().valid('employer', 'employee', 'admin'),
    image_url: Joi.string(),
  }).options({ abortEarly: false });

  const validation = schema.validate(body);

  if (validation.error) {
    const errors = validation.error.details.map((err) => {
      return {
        message: err.message || 'Invalid input',
        property: err.path[0] || 'auth',
      };
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      status: StatusCodes.BAD_REQUEST,
      errors,
    });
  }
  next();
};

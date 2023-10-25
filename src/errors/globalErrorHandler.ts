import { Request, Response, NextFunction } from "express";
import { BaseError } from "./BaseError";

async function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.send({ errors: err.serializeErrors() });
  }
  res.send({ errors: [{ message: "An error occurred" }] });
}

export default errorMiddleware;

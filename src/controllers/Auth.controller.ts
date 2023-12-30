import { Request, Response, NextFunction } from 'express';
import { createUser, loginUser } from '../services/auth.services';

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { user, token } = await createUser(req);

      return res.status(201).json({ success: true, token, user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { existingUser, token } = await loginUser(req);

      return res.status(200).json({ success: true, user: existingUser, token });
    } catch (err) {
      next(err);
    }
  }
}

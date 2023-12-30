import { Request, Response, NextFunction } from 'express';
import { getUserProfile, getUsers } from '../services/user.services';

export class UserController {
  static async users(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await getUsers();
      return res
        .status(200)
        .json({ success: true, fromCache: false, data: users });
    } catch (err) {
      next(err);
    }
  }

  static async profile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await getUserProfile(req);
      return res.status(200).json({ success: true, user });
    } catch (err) {
      next(err);
    }
  }
}

import express from 'express';
import { UserController } from '../controllers/User.controller';
import {
  authenticateUser,
  authorizeUser,
} from '../middlewares/auth.middleware';
import { getCachedUsers } from '../middlewares/users.middleware';

const router = express.Router();

router.get(
  '/users',
  authenticateUser,
  authorizeUser(['admin']),
  getCachedUsers,
  UserController.users,
);

export default router;

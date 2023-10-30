import express from 'express';
import { AuthController } from '../controllers/Auth.controller';
import { validateInput } from '../validators/user.validators';

const router = express.Router();

router.post('/auth/signup', validateInput, AuthController.signUp);

router.post('/auth/login', validateInput, AuthController.login);

export default router;

import express from 'express';
import { allUsers, saveUser } from '../controller/user.controller';
import { validateInput } from '../validators/user.validators';

const router = express.Router();

router.get('/users', allUsers);

router.post('/users', validateInput, saveUser);

export default router;

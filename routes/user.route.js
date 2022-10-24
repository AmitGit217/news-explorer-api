import express from 'express';

import { currentUser } from '../entities/user/user.controller.js';

const userRouter = express.Router();

userRouter.get('/users/me', currentUser);

export default userRouter;

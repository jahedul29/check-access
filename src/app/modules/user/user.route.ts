import express from 'express';
import { validateRequestWithZod } from '../../middlewares/validateRequestWithZod.middleware';
import { UserController } from './user.controller';
import { UserValidationSchema } from './user.validate';

const userRouter = express.Router();

userRouter.post('/create', UserController.createUser);
userRouter.get('/', UserController.getAllUsers);

userRouter.patch(
  '/:id',
  validateRequestWithZod(UserValidationSchema.updateZodValidateSchema),
  UserController.updateUser
);

userRouter.get('/:id', UserController.getSingleUser);

userRouter.delete('/:id', UserController.deleteUser);

export const UserRouter = userRouter;

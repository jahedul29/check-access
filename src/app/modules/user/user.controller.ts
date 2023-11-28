/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    const savedUser = await UserService.createUser(user);

    let finalUser: Omit<IUser, 'password'> | null = null;

    if (savedUser?.password) {
      const { password, ...userData } = savedUser;
      finalUser = userData;
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User saved successfully',
      data: finalUser,
    });
  }
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = req.body;

    const savedUser = await UserService.updateUser(user, id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User updated successfully',
      data: savedUser,
    });
  }
);

const getAllUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const savedUser = await UserService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved successfully',
      data: savedUser,
    });
  }
);

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const savedUser = await UserService.getSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrieved successfully',
      data: savedUser,
    });
  }
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const deletedUser = await UserService.deleteUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  }
);

export const UserController = {
  createUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};

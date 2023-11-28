import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { CheckService } from './check.service';

const create: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await CheckService.create(req);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: '',
      data: null,
    });
  }
);

const findAll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const savedUser = await CheckService.findAll();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Users retrieved successfully',
      data: savedUser,
    });
  }
);

const findOne: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const savedUser = await CheckService.findOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User retrieved successfully',
      data: savedUser,
    });
  }
);

const deleteOne: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedUser = await CheckService.deleteOne(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  }
);

export const CheckController = {
  create,
  findAll,
  findOne,
  deleteOne,
};

import { Request } from 'express';
import httpStatus from 'http-status';
import Ip from 'ip';
import { ApiError } from '../../../shared/errors/errors.clsses';
import { ICheck } from './check.interface';
import Check from './check.model';

const create = async (req: Request) => {
  const userAgent = req.get('User-Agent');
  const userData = req.body;

  const ipAddress = Ip.address();

  await Check.create({
    ip_address: ipAddress,
    user_agent: userAgent,
    application_name: userData.application_name,
    related_url: userData.related_url,
  });
};

const findAll = async () => {
  const allRecords = await Check.find();
  return allRecords;
};

const findOne = async (id: string): Promise<ICheck | null> => {
  const existingRecord = await Check.findById(id);
  if (!existingRecord) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Record not found');
  }
  return existingRecord;
};

const deleteOne = async (id: string): Promise<ICheck | null> => {
  const deletedRecord = await Check.findByIdAndDelete(id);
  return deletedRecord;
};

export const CheckService = {
  create,
  findAll,
  findOne,
  deleteOne,
};

/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: IUserName;
  address: string;
  budget: number;
  income: number;
};

export type IUserMethods = object;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserModel extends Model<IUser, object, IUserMethods> {
  isUserExist(phoneNumber: string): Promise<
    | (Pick<IUser, 'phoneNumber' | 'role' | 'password'> & {
        _id: Types.ObjectId;
      })
    | null
  >;
  isPasswordMatch(
    givenPassword: string,
    currentPassword: string
  ): Promise<boolean>;
}

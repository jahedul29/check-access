import bcrypt from 'bcrypt';
import { Schema, Types, model } from 'mongoose';
import { userRoles } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: userRoles,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (phoneNumber: string): Promise<
  | (Pick<IUser, 'phoneNumber' | 'role' | 'password'> & {
      _id: Types.ObjectId;
    })
  | null
> {
  return await User.findOne(
    { phoneNumber },
    {
      _id: 1,
      phoneNumber: 1,
      password: 1,
      role: 1,
    }
  );
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  currentPassword: string
) {
  return await bcrypt.compare(givenPassword, currentPassword);
};

//* You can use this if you want to do some operation before saving it in databse.
//* Below it's hashing the password before saving.
// userSchema.pre('save', async function (next) {
//   if (this.password) {
//     this.password = await bcrypt.hash(
//       this.password,
//       Number(config.bcrypt_salt_rounds)
//     );
//   }
//   next();
// });

//* You can use this if you want to do some operation before updating it in databse.
//* Below it's hashing the password before updating.
// userSchema.pre('findOneAndUpdate', async function (next) {
//   try {
//     const update: any = this.getUpdate();
//     if (update.password) {
//       update.password = await bcrypt.hash(
//         update.password,
//         Number(config.bcrypt_salt_rounds)
//       );
//     }
//     next();
//   } catch (error) {
//     next(error as Error);
//   }
// });

const User = model<IUser, UserModel>('User', userSchema);

export default User;

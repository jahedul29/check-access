import { Schema, model } from 'mongoose';
import { ICheck } from './check.interface';

const checkSchema = new Schema<ICheck>(
  {
    ip_address: {
      type: String,
      required: true,
    },
    user_agent: {
      type: String,
      required: true,
    },
    application_name: {
      type: String,
      required: true,
    },
    related_url: {
      type: String,
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

const Check = model<ICheck>('Check', checkSchema);

export default Check;

import { Schema, model } from 'mongoose';
import { ICheck } from './check.interface';

const checkSchema = new Schema<ICheck>({
  ip_address: {
    type: String,
    required: true,
  },
  user_agent: {
    type: String,
    required: true,
  },
});

const Check = model<ICheck>('Check', checkSchema);

export default Check;

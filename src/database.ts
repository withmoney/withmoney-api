import mongoose, { Document } from 'mongoose';

const { MONGODB } = process.env;

if (!MONGODB) {
  throw new Error('MONGODB env is not defined');
}

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
});
export interface IUser extends Document {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const Users = mongoose.model<IUser>('Users', userSchema);

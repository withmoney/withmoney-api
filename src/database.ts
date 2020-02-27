import mongoose, { Document } from 'mongoose';

const mongodbURL = process.env.MONGODB;

if (!mongodbURL) {
  throw new Error('MONGODB env is not defined');
}

mongoose.connect(mongodbURL, {
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

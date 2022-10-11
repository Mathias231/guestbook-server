import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import userModel, { IUser } from '../models/user.model';

if (typeof process.env.MONGO_URI === 'undefined') {
  throw new Error('Envirement Variable MONGO_URI is not set');
}

const connect = async () => {
  let db = await mongoose.connect(process.env.MONGO_URI || '');
  return db;
};

// Create User
export const createUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<IUser> => {
  let db = await connect();
  let hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({ username, password: hashedPassword });
  let dbReq = await newUser.save();
  return dbReq;
};

// Update User
export const updateUser = async (
  id: string,
  {
    username,
    password,
  }: {
    username?: string;
    password?: string;
  },
): Promise<IUser> => {
  let db = await connect();
  let User = await userModel.findById(id);
  if (User === null) {
    throw new Error('User not found');
  }
  if (username) User.username = username; // TODO: Add option to only change username or password
  if (password) User.password = await bcrypt.hash(password, 10);
  let dbReq = await User.save();
  return dbReq;
};

// Delete User
export const deleteUser = async (id: string): Promise<IUser> => {
  let db = await connect();
  let User = await userModel.findByIdAndDelete(id);
  if (User === null) {
    throw new Error('User not found');
  }
  return User;
};

// Create Post

export default connect;

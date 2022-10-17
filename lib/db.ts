import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import userModel, { IUser } from '../models/user.model';
import postModel, { IPost } from '../models/post.model';
import commentModel, { IComment } from '../models/comment.model';

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
  if (username) User.username = username;
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
export const createPost = async ({
  userId,
  title,
  content,
}: {
  userId: string;
  title: string;
  content: string;
}): Promise<IPost> => {
  let db = await connect();

  const createPost = new postModel({ userId, title, content });
  let dbReq = await createPost.save();
  return dbReq;
};

// Update Post
export const updatePost = async (
  id: string,
  { title, content }: { title: string; content: string },
): Promise<IPost> => {
  let db = await connect();
  let Post = await postModel.findById(id);
  if (Post === null) {
    throw new Error('Post not found');
  }

  if (title) Post.title = title;
  if (content) Post.content = content;
  let dbReq = await Post.save();
  return dbReq;
};

// Delete Post
export const deletePost = async (id: string): Promise<IPost> => {
  let db = await connect();
  let Post = await postModel.findByIdAndDelete(id);
  if (Post === null) {
    throw new Error('Post not found');
  }
  return Post;
};

// Create comment
export const createComment = async ({
  userId,
  postId,
  title,
  content,
}: {
  userId: string;
  postId: string;
  title: string;
  content: string;
}): Promise<IComment> => {
  let db = await connect();

  const createComment = new commentModel({ userId, postId, title, content });
  let dbReq = await createComment.save();
  return dbReq;
};

export default connect;

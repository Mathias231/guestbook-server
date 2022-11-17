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

// Find User
export const findUserAndCreateUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  let db = await connect();

  // Search for user
  let search = await userModel.findOne({
    username: username,
  });

  // If user doesn't exist, create user
  if (search === null) {
    console.log('True: ' + search);
    createUser({ username, password });
  }

  console.log('User already exist. Returning False');
  return false;
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

// Create Comment
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

// Update Comment
export const updateComment = async (
  commentId: string,
  { title, content }: { title: string; content: string },
): Promise<IComment> => {
  let db = await connect();
  const Comment = await commentModel.findById(commentId);

  if (Comment === null) {
    throw new Error('Comment not found');
  }

  if (title) Comment.title = title;
  if (content) Comment.content = content;

  let dbReq = await Comment.save();
  return dbReq;
};

// Delete Comment
export const deleteComment = async (id: string): Promise<IComment> => {
  let db = await connect();
  const Comment = await commentModel.findByIdAndDelete(id);
  if (Comment === null) {
    throw new Error('Comment not found');
  }
  return Comment;
};

export default connect;

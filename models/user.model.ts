import { Schema, model, Types, Document } from 'mongoose';
import { IComment } from './comment.model';
import { IPost } from './post.model';
export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  password: string;
  posts: IPost[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const User = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  },
  {
    timestamps: true,
  },
);

const userModel = model<IUser>('user', User);

export default userModel;

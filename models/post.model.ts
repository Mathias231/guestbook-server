import { Schema, model, Document } from 'mongoose';
import { IComment } from './comment.model';
export interface IPost extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  content: string;
  comments: IComment[];
}
const Post = new Schema<IPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    content: { type: String, requred: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
  },
  {
    timestamps: true,
  },
);

const postModel = model<IPost>('post', Post);

export default postModel;

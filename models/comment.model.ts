import { Schema, model, Document } from 'mongoose';
export interface IComment extends Document {
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
  title: string;
  content: string;
}
const Comment = new Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    title: { type: String, required: true },
    content: { type: String, requred: true },
  },
  {
    timestamps: true,
  },
);

const commentModel = model<IComment>('comment', Comment);
export default commentModel;

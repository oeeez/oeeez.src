import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  title: string;
  body: string;
  author: mongoose.Types.ObjectId;
  type: 'article' | 'video' | 'image';
  tags: string[];
  likes: number;
  comments: mongoose.Types.ObjectId[];
}

const contentSchema = new Schema<IContent>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['article', 'video', 'image'], required: true },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

export const Content = mongoose.model<IContent>('Content', contentSchema);

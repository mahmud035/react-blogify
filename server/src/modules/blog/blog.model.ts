import { Schema, model } from 'mongoose';
import type { IBlog, IComment } from './blog.interface';

const toJSONOptions = {
  virtuals: true,
  versionKey: false,
  transform(_doc: unknown, ret: Record<string, unknown>) {
    delete ret._id;
    return ret;
  },
};

const commentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, trim: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false }, toJSON: toJSONOptions },
);

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    thumbnail: { type: String, default: null },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true, toJSON: toJSONOptions },
);

// Speeds up author-profile blog lookups and popularity sorting.
blogSchema.index({ author: 1 });

export const Blog = model<IBlog>('Blog', blogSchema);

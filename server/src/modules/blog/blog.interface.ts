import type { Types } from 'mongoose';

export interface IComment {
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
}

export interface IBlog {
  title: string;
  content: string;
  thumbnail: string | null;
  author: Types.ObjectId;
  tags: string[];
  likes: Types.ObjectId[];
  comments: Types.DocumentArray<IComment>;
}

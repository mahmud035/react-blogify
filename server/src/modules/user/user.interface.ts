import type { Model, Types } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  bio: string;
  password: string;
  favourites: Types.ObjectId[];
}

export interface IUserMethods {
  comparePassword(candidate: string): Promise<boolean>;
}

export type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

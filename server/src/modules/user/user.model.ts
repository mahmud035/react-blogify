import { Schema, model, type HydratedDocument } from 'mongoose';
import bcrypt from 'bcryptjs';
import type { IUser, IUserMethods, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: { type: String, default: null },
    bio: { type: String, default: '' },
    password: { type: String, required: true, select: false },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_doc, ret: Record<string, unknown>) {
        delete ret._id;
        delete ret.password;
        return ret;
      },
    },
  },
);

// Hash the password whenever it is set/changed.
userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function comparePassword(
  this: HydratedDocument<IUser>,
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

export const User = model<IUser, UserModel>('User', userSchema);

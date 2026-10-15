import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: '' },
    role: {
      type: String,
      enum: ['Administrator', 'Editor', 'Author', 'Contributor'],
      default: 'Editor',
    },
    avatar: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User: any =
  mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

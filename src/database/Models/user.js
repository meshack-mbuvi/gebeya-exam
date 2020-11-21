import mongoose from 'mongoose';

/**
 * Schema for the Users collection
 */
const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    password: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);

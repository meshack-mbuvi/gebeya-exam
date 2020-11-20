import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

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
// UserSchema.plugin(mongoosePaginate);
export default mongoose.model('User', UserSchema);

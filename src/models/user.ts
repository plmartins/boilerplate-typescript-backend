import mongoose, { Schema } from 'mongoose';

export type typeUserRole = 'dev' | 'user';

// Type user
export type TUser = {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  role: typeUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema
const userMongooseSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['dev', 'user'], required: true },
  phone: { type: String, required: true },
  cpf: { type: String, required: true }
}, {
  timestamps: true
});

// Model
export const UserModel = mongoose.model('User', userMongooseSchema);

// Type
export type UserDocument = mongoose.Document & TUser;

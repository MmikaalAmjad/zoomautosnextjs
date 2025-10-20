import mongoose, { Schema, Document, models } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  password: string;
  role: 'SuperAdmin' | 'Admin';
}

const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['SuperAdmin', 'Admin'] },
  },
  { timestamps: true }
);

// Prevent model overwrite upon hot-reload
const Admin = models['TransportAdmin'] || mongoose.model<IAdmin>('TransportAdmin', adminSchema, 'Transport Admin');

export default Admin;

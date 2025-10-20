import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true },
});

const Role = mongoose.models["Role"] || model('Role', roleSchema);

export default Role;

import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IResponsibility extends Document {
  name: string;
}

const responsibilitySchema = new Schema<IResponsibility>({
  name: { type: String, required: true },
});

// Avoid recompiling model if it already exists
const Responsibility = mongoose.models["Responsibilities"] || model('Responsibilities', responsibilitySchema);

export default Responsibility;

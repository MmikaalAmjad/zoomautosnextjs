import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IMoveService extends Document {
  description: string;
  
}

const moveServiceSchema = new Schema<IMoveService>(
  {
    description: { type: String, required: true },
  },
  {  collection: 'MoveFeatures' } // Explicit collection name
);

const MoveService = mongoose.models["MoveFeatures"] || model('MoveFeatures', moveServiceSchema);

export default MoveService;

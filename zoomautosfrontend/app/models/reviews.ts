import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IMoveReview extends Document {
  Name: string;
  jobId?: number | null;
  rating: number;
  feedback?: string;
  professionalism?: number | null;
  communication?: number | null;
  driver?: number | null;
}

const moveReviewSchema = new Schema<IMoveReview>(
  {
    Name: { type: String, required: true },
    jobId: { type: Number, default: null },
    rating: { type: Number, required: true, min: 1, max: 5 },
    feedback: { type: String, minlength: 10, maxlength: 500, default: '' },
    professionalism: { type: Number, min: 1, max: 5, default: null },
    communication: { type: Number, min: 1, max: 5, default: null },
    driver: { type: Number, min: 1, max: 5, default: null },
  },
  { timestamps: true }
);

const MoveReview =
  mongoose.models["MoveReview"] || model('MoveReview', moveReviewSchema, 'Movereviews');

export default MoveReview;

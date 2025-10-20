import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IContact extends Document {
  contactNo: string;
  updatedAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    contactNo: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value: string) => /^\+?[0-9\s\-()]{7,15}$/.test(value),
        message: (props: any) => `${props.value} is not a valid contact number!`,
      },
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'logistics contacts', // specify exact collection name
  }
);

// Avoid recompiling model if it already exists
const Contact = mongoose.models["Logistics Contact"] || mongoose.model('Logistics Contact', contactSchema);

export default Contact;

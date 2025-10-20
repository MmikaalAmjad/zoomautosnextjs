import mongoose, { Schema, Document, Model } from "mongoose";

export const getDynamicFormModel = (formType: string): Model<Document> => {
  try {
    // Check if model already exists
    if (mongoose.models[formType]) {
      return mongoose.model<Document>(formType);
    }

    // Create a new model with loose schema
    const schema = new Schema({}, { strict: false });
    const model = mongoose.model<Document>(formType, schema);
    console.log(`✅ Model for ${formType} created successfully`);
    return model;
  } catch (err) {
    console.error(`❌ Error creating model for ${formType}:`, err);
    throw new Error(`Failed to create model for ${formType}`);
  }
};

import mongoose, { Schema, models, model } from 'mongoose';

const dynamicRecordSchema = new Schema({}, { strict: false });

// Use existing model if it exists, otherwise create a new one
const SubContractJob =
  models.SubContractJob ||
  model("SubContractJob", dynamicRecordSchema, "sub contract jobs"); // <-- matches exactly your Atlas collection

export default SubContractJob;

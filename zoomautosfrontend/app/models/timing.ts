import mongoose, { Schema, models, model } from "mongoose";

const TimingSchema = new Schema(
  {
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { timestamps: true }
);

// Hot reload safe
const Timing = models.Timing || model("Timing", TimingSchema);

export default Timing;

import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    locationUrl: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const Location = mongoose.models["Location Logistics"] || mongoose.model("Location Logistics", LocationSchema);

export default Location;

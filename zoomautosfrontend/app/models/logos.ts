import mongoose, { Schema, models, model } from "mongoose";

const LogosSchema = new Schema({
  Image: { type: Array, required: true },
}, { timestamps: true });

// Prevent recompilation on hot reload
const Logos = models.Logos || model("Logos", LogosSchema, "Logos"); // specify exact collection name

export default Logos;

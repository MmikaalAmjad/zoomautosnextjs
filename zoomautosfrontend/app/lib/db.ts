import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI||'URL';

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env");
}

// Extend global to cache connection (Next.js hot reload safe)
declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

const cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;

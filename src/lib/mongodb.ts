import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("Please define MONGODB_URI in .env.local");

// Extend global type to cache the connection
declare global {
  // Use a unique name to avoid clashing with Next.js or other globals
  var __mongoose__: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

// Reuse the global cache if available
const cached = global.__mongoose__ ?? (global.__mongoose__ = { conn: null, promise: null });

export default async function connectDB() {
  // If already connected, return immediately
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection is in progress, wait for it
  if (cached.promise) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (err) {
      cached.promise = null;
      cached.conn = null;
    }
  }

  // Create new connection
  if (!cached.promise) {
    console.log("MongoDB: Establishing new connection...");
    cached.promise = mongoose
      .connect(MONGODB_URI, { 
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then((m) => {
        console.log("MongoDB: Connection established successfully");
        return m;
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    // Ensure connection is ready before proceeding
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB connection not ready");
    }
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    console.error("MongoDB: Failed to establish connection:", err);
    throw err;
  }
}

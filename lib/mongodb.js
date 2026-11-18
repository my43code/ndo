import mongoose from "mongoose";

const cached = globalThis.ndoMongo ??= { connection: null, attempt: null };
const timeoutMs = 8000;

export async function connectMongoDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  if (cached.connection?.connection?.readyState === 1) return cached.connection;
  if (cached.connection) {
    cached.connection = null;
  }

  if (!cached.attempt) {
    const attempt = mongoose.connect(uri, {
      serverSelectionTimeoutMS: timeoutMs,
      connectTimeoutMS: timeoutMs,
      waitQueueTimeoutMS: timeoutMs,
      socketTimeoutMS: 15000,
      maxPoolSize: 5,
      minPoolSize: 1,
      maxIdleTimeMS: 60000,
      bufferCommands: false,
      family: 4,
    });

    cached.attempt = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("MongoDB connection timed out")), timeoutMs + 2000);
      attempt.then(
        connection => {
          clearTimeout(timer);
          cached.connection = connection;
          cached.attempt = null;
          resolve(connection);
        },
        error => {
          clearTimeout(timer);
          cached.attempt = null;
          reject(error);
        }
      );
    });
  }

  return cached.attempt;
}

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let mongodInstance;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    if (!uri) {
      // Lazy-load mongodb-memory-server only when needed
      console.warn("MONGO_URI not provided — starting in-memory MongoDB for development");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongodInstance = await MongoMemoryServer.create();
      uri = mongodInstance.getUri();
    }

    await mongoose.connect(uri, { dbName: process.env.DB_NAME || undefined });
    console.log("MongoDB Connected 🚀");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export const stopInMemoryMongo = async () => {
  if (mongodInstance) await mongodInstance.stop();
};

export default connectDB;

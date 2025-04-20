import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    const clientOptions = {
      serverApi: ServerApiVersion.v1
    };

    await mongoose.connect(uri, clientOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
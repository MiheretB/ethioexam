import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection - using direct connection string
const uri = "mongodb+srv://miheret:yellowtek@cluster0.911drx6.mongodb.net/ethioexam?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EthioExam API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
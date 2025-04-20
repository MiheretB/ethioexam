import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ServerApiVersion } from 'mongodb';
import routes from './routes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount all routes under /api
app.use('/api', routes);

// Root route for basic server check
app.get('/', (req, res) => {
  res.json({ message: 'EthioExam API is running' });
});

// MongoDB connection
const uri = "mongodb+srv://miheret:yellowtek@cluster0.911drx6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
};

mongoose.connect(uri, clientOptions)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler for unmatched routes
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
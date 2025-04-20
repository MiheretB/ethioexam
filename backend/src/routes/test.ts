import express from 'express';
import { User } from '../models/User';

const router = express.Router();

router.get('/test-db', async (req, res) => {
    try {
        // Try to create a test user
        const testUser = new User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890',
            gender: 'male',
            stream: 'natural',
            grade: 9,
            language: 'en'
        });

        await testUser.save();
        await User.findByIdAndDelete(testUser._id); // Clean up test user

        res.json({
            status: 'success',
            message: 'Database connection is working properly'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Database connection test failed',
            error: error.message
        });
    }
});

export default router;
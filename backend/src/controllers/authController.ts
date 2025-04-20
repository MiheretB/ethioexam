import { Request, Response } from 'express';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      // Check MongoDB connection state
      if (mongoose.connection.readyState !== 1) {
        console.log('Current MongoDB state:', mongoose.connection.readyState);
        return res.status(500).json({
          status: 'error',
          message: 'Database connection not ready, please try again'
        });
      }

      const { name, email, password, phone, gender, stream, grade } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists'
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        gender,
        stream,
        grade: Number(grade),
        language: 'en'
      });

      // Generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      res.status(201).json({
        status: 'success',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            grade: user.grade,
            stream: user.stream
          }
        }
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message || 'Registration failed'
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
      }

      // Generate token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '30d' }
      );

      res.json({
        status: 'success',
        data: {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            grade: user.grade,
            stream: user.stream
          }
        }
      });
    } catch (error: any) {
      res.status(500).json({
        status: 'error',
        message: error.message || 'Login failed'
      });
    }
  },

  verifyToken: async (req: Request, res: Response) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({
          status: 'error',
          message: 'No token provided'
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid token'
        });
      }

      res.json({
        status: 'success',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            grade: user.grade,
            stream: user.stream
          }
        }
      });
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
  }
};

export default authController;
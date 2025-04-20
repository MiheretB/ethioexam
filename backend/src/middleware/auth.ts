import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any; // or use your specific User type instead of `any`
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided'
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };
    (req as any).user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Please authenticate'
    });
  }
};

export const protect = auth; // Add this line to fix the protect import error
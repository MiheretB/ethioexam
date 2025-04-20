import { Request, Response } from 'express';
import { aiServices } from '../services/aiServices';
import { Question } from '../models/Question';
import { Progress } from '../models/Progress'; // Add this import at the top

export const examController = {
  // Generate mock exam
  generateMockExam: async (req: Request, res: Response) => {
    try {
      const { subject, grade, difficulty, topics } = req.body;
      
      // Generate questions using AI
      const mockQuestion = await aiServices.generateMockExam(
        subject,
        grade,
        difficulty,
        topics
      );
      
      // Save to database
      const question = await Question.create(mockQuestion);
      
      res.status(201).json({
        status: 'success',
        data: { question }
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Scan and process uploaded exam
  scanAndProcessExam: async (req: Request, res: Response) => {
    try {
      const { examContent } = req.body;
      
      // Scan exam using AI
      const questions = await aiServices.scanExam(examContent);
      
      // Save all questions to database
      const savedQuestions = await Question.insertMany(questions);
      
      res.status(201).json({
        status: 'success',
        data: { questions: savedQuestions }
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Generate personalized practice questions
  generatePersonalizedQuestions: async (req: Request, res: Response) => {
    try {
      const { subject, grade } = req.body;
      const userId = req.user?.id;

      // Get student's performance data
      // This would come from your Progress model
      const studentPerformance = await Progress.find({ user: userId });

      // Generate personalized questions using AI
      const questions = await aiServices.generatePersonalizedQuestions(
        studentPerformance,
        subject,
        grade
      );

      // Save questions to database
      const savedQuestions = await Question.insertMany(questions);

      res.status(201).json({
        status: 'success',
        data: { questions: savedQuestions }
      });
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
};
import { Request, Response } from 'express';
import { Progress } from '../models/Progress';
import { User } from '../models/User';

export const progressController = {
  // Get user's progress statistics
  getStats: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const progress = await Progress.find({ user: userId, completed: true });

      const stats = {
        totalExams: progress.length,
        averageScore: 0,
        timeSpent: 0,
        subjectPerformance: {} as { [key: string]: number },
        recentScores: [] as number[]
      };

      if (progress.length > 0) {
        stats.averageScore = progress.reduce((acc, curr) => acc + curr.score, 0) / progress.length;
        stats.timeSpent = progress.reduce((acc, curr) => acc + curr.timeSpent, 0);
        stats.recentScores = progress.slice(-5).map(p => p.score);
      }

      res.status(200).json({
        status: 'success',
        data: { stats }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Complete exam and calculate final score
  completeExam: async (req: Request, res: Response) => {
    try {
      const { progressId } = req.params;
      const userId = req.user.id;

      const progress = await Progress.findOne({
        _id: progressId,
        user: userId
      }).populate('exam');

      if (!progress) {
        return res.status(404).json({
          status: 'error',
          message: 'Progress not found'
        });
      }

      // Calculate score
      const correctAnswers = progress.answers.filter(a => a.isCorrect).length;
      const totalQuestions = progress.answers.length;
      const score = (correctAnswers / totalQuestions) * 100;

      // Update progress
      progress.score = score;
      progress.completed = true;
      progress.completedAt = new Date();
      await progress.save();

      // Update user's overall progress
      await User.findByIdAndUpdate(userId, {
        $inc: {
          'progress.examsCompleted': 1,
          'progress.totalScore': score
        }
      });

      res.status(200).json({
        status: 'success',
        data: {
          score,
          correctAnswers,
          totalQuestions,
          timeSpent: progress.timeSpent
        }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
};
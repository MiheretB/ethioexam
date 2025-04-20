import { Request, Response } from 'express';
import { User } from '../models/User';
import { Question } from '../models/Question';
import { getErrorMessage } from '../utils/errorHandler';

export const bookmarkController = {
  // Add bookmark
  addBookmark: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Not authenticated'
        });
      }
      const { questionId } = req.params;
      const userId = req.user.id;

      await User.findByIdAndUpdate(userId, {
        $addToSet: { bookmarks: questionId }
      });

      res.status(200).json({
        status: 'success',
        message: 'Question bookmarked successfully'
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: getErrorMessage(error)
      });
    }
  },

  // Remove bookmark
  removeBookmark: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Not authenticated'
        });
      }
      const { questionId } = req.params;
      const userId = req.user.id;

      await User.findByIdAndUpdate(userId, {
        $pull: { bookmarks: questionId }
      });

      res.status(200).json({
        status: 'success',
        message: 'Bookmark removed successfully'
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: getErrorMessage(error)
      });
    }
  },

  // Get bookmarked questions
  /*getBookmarks: async (req: Request & { user?: any }, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'Not authenticated'
        });
      }
      const userId = req.user.id;
      const user = await User.findById(userId).populate('bookmarks');

      res.status(200).json({
        status: 'success',
        data: { bookmarks: user?.bookmarks || [] }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: getErrorMessage(error)
      });
    }*/
      getBookmarks: async (req: Request & { user?: any }, res: Response) => {
        try {
          if (!req.user) {
            return res.status(401).json({
              status: 'error',
              message: 'Not authenticated'
            });
          }
      
          const userId = req.user.id;
          const user = await User.findById(userId).populate('bookmarks') as IUser;
      
          res.status(200).json({
            status: 'success',
            data: { bookmarks: user?.bookmarks || [] }
          });
        } catch (error) {
          res.status(400).json({
            status: 'error',
            message: getErrorMessage(error)
          });
        }
      }
      
  
};
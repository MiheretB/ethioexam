import express from 'express';
import { bookmarkController } from '../controllers/bookmarkController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.post('/:questionId', bookmarkController.addBookmark);
router.delete('/:questionId', bookmarkController.removeBookmark);
router.get('/', bookmarkController.getBookmarks);

export default router;
import express from 'express';
import { progressController } from '../controllers/progressController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.get('/stats', progressController.getStats);
router.post('/:progressId/complete', progressController.completeExam);

export default router;
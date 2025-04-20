import express from 'express';
import { examController } from '../controllers/examController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.use(auth);

router.post('/generate-mock', examController.generateMockExam);
router.post('/scan-exam', examController.scanAndProcessExam);
router.post('/personalized-practice', examController.generatePersonalizedQuestions);

export default router;
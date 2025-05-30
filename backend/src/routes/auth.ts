import express from 'express';
import { authController } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', auth, authController.verifyToken);

export default router;
import express from 'express';
import authRoutes from './auth';
// import examRoutes from './exam';  // Uncomment when you create these
// import progressRoutes from './progress';  // Uncomment when you create these

const router = express.Router();

// Test route for /api
router.get('/', (req, res) => {
  res.json({ message: 'EthioExam API routes are working' });
});

// Mount route modules
router.use('/auth', authRoutes);
// router.use('/exam', examRoutes);  // Uncomment when you create these
// router.use('/progress', progressRoutes);  // Uncomment when you create these

export default router;
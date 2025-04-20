"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
// import examRoutes from './exam';  // Uncomment when you create these
// import progressRoutes from './progress';  // Uncomment when you create these
const router = express_1.default.Router();
// Test route for /api
router.get('/', (req, res) => {
    res.json({ message: 'EthioExam API routes are working' });
});
// Mount route modules
router.use('/auth', auth_1.default);
// router.use('/exam', examRoutes);  // Uncomment when you create these
// router.use('/progress', progressRoutes);  // Uncomment when you create these
exports.default = router;

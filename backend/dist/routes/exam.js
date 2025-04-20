"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const examController_1 = require("../controllers/examController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.use(auth_1.auth);
router.post('/generate-mock', examController_1.examController.generateMockExam);
router.post('/scan-exam', examController_1.examController.scanAndProcessExam);
router.post('/personalized-practice', examController_1.examController.generatePersonalizedQuestions);
exports.default = router;

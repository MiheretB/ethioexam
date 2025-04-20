"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examController = void 0;
const aiServices_1 = require("../services/aiServices");
const Question_1 = require("../models/Question");
exports.examController = {
    // Generate mock exam
    generateMockExam: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { subject, grade, difficulty, topics } = req.body;
            // Generate questions using AI
            const mockQuestion = yield aiServices_1.aiServices.generateMockExam(subject, grade, difficulty, topics);
            // Save to database
            const question = yield Question_1.Question.create(mockQuestion);
            res.status(201).json({
                status: 'success',
                data: { question }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    // Scan and process uploaded exam
    scanAndProcessExam: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { examContent } = req.body;
            // Scan exam using AI
            const questions = yield aiServices_1.aiServices.scanExam(examContent);
            // Save all questions to database
            const savedQuestions = yield Question_1.Question.insertMany(questions);
            res.status(201).json({
                status: 'success',
                data: { questions: savedQuestions }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    // Generate personalized practice questions
    generatePersonalizedQuestions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { subject, grade } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            // Get student's performance data
            // This would come from your Progress model
            const studentPerformance = yield Progress.find({ user: userId });
            // Generate personalized questions using AI
            const questions = yield aiServices_1.aiServices.generatePersonalizedQuestions(studentPerformance, subject, grade);
            // Save questions to database
            const savedQuestions = yield Question_1.Question.insertMany(questions);
            res.status(201).json({
                status: 'success',
                data: { questions: savedQuestions }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    })
};

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
exports.progressController = void 0;
const Progress_1 = require("../models/Progress");
const User_1 = require("../models/User");
exports.progressController = {
    // Get user's progress statistics
    getStats: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const progress = yield Progress_1.Progress.find({ user: userId, completed: true });
            const stats = {
                totalExams: progress.length,
                averageScore: 0,
                timeSpent: 0,
                subjectPerformance: {},
                recentScores: []
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
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    // Complete exam and calculate final score
    completeExam: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { progressId } = req.params;
            const userId = req.user.id;
            const progress = yield Progress_1.Progress.findOne({
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
            yield progress.save();
            // Update user's overall progress
            yield User_1.User.findByIdAndUpdate(userId, {
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
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    })
};

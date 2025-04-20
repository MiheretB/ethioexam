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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
router.get('/test-db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Try to create a test user
        const testUser = new User_1.User({
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            phone: '1234567890',
            gender: 'male',
            stream: 'natural',
            grade: 9,
            language: 'en'
        });
        yield testUser.save();
        yield User_1.User.findByIdAndDelete(testUser._id); // Clean up test user
        res.json({
            status: 'success',
            message: 'Database connection is working properly'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Database connection test failed',
            error: error.message
        });
    }
}));
exports.default = router;

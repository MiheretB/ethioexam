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
exports.authController = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.authController = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, phone, gender, stream, grade, language } = req.body;
            // Check if user already exists
            const existingUser = yield User_1.User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User already exists'
                });
            }
            // Hash password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            // Create new user
            const user = yield User_1.User.create({
                name,
                email,
                password: hashedPassword,
                phone,
                gender,
                stream,
                grade,
                language
            });
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
            res.status(201).json({
                status: 'success',
                data: {
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        grade: user.grade,
                        stream: user.stream
                    }
                }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Find user
            const user = yield User_1.User.findOne({ email }).select('+password');
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid credentials'
                });
            }
            // Check password
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid credentials'
                });
            }
            // Generate token
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '30d' });
            res.json({
                status: 'success',
                data: {
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        grade: user.grade,
                        stream: user.stream
                    }
                }
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }),
    verifyToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json({
                    status: 'error',
                    message: 'No token provided'
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = yield User_1.User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid token'
                });
            }
            res.json({
                status: 'success',
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        grade: user.grade,
                        stream: user.stream
                    }
                }
            });
        }
        catch (error) {
            res.status(401).json({
                status: 'error',
                message: 'Invalid token'
            });
        }
    })
};

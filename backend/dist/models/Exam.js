"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const examSchema = new mongoose_1.Schema({
    title: {
        en: { type: String, required: true },
        am: { type: String, required: true }
    },
    description: {
        en: { type: String, required: true },
        am: { type: String, required: true }
    },
    questions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Question' }],
    duration: { type: Number, required: true },
    subject: { type: String, required: true },
    grade: { type: Number, required: true },
    stream: { type: String, enum: ['natural', 'social'], required: true },
    totalMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    pdfUrl: String,
    isActive: { type: Boolean, default: true }
});
exports.Exam = mongoose_1.default.model('Exam', examSchema);

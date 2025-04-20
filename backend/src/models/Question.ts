import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  text: {
    en: string;
    am: string;
  };
  options: {
    en: string[];
    am: string[];
  };
  correctAnswer: number;
  explanation: {
    en: string;
    am: string;
  };
  subject: string;
  grade: number;
  difficulty: 'easy' | 'medium' | 'hard';
  unit: string;
  tags: string[];
  pdfUrl?: string;
  pdfPage?: number;
}

const questionSchema = new Schema<IQuestion>({
  text: {
    en: { type: String, required: true },
    am: { type: String, required: true }
  },
  options: {
    en: [{ type: String, required: true }],
    am: [{ type: String, required: true }]
  },
  correctAnswer: { type: Number, required: true },
  explanation: {
    en: { type: String, required: true },
    am: { type: String, required: true }
  },
  subject: { type: String, required: true },
  grade: { type: Number, required: true },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'], 
    required: true 
  },
  unit: { type: String, required: true },
  tags: [String],
  pdfUrl: String,
  pdfPage: Number
});

export const Question = mongoose.model<IQuestion>('Question', questionSchema);
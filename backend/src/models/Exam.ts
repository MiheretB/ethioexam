import mongoose, { Document, Schema } from 'mongoose';

export interface IExam extends Document {
  title: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  questions: mongoose.Types.ObjectId[];
  duration: number; // in minutes
  subject: string;
  grade: number;
  stream: 'natural' | 'social';
  totalMarks: number;
  passingMarks: number;
  pdfUrl?: string;
  isActive: boolean;
}

const examSchema = new Schema<IExam>({
  title: {
    en: { type: String, required: true },
    am: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    am: { type: String, required: true }
  },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  duration: { type: Number, required: true },
  subject: { type: String, required: true },
  grade: { type: Number, required: true },
  stream: { type: String, enum: ['natural', 'social'], required: true },
  totalMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true },
  pdfUrl: String,
  isActive: { type: Boolean, default: true }
});

export const Exam = mongoose.model<IExam>('Exam', examSchema);
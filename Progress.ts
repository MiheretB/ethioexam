import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  exam: mongoose.Types.ObjectId;
  answers: {
    question: mongoose.Types.ObjectId;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number; // in seconds
    note?: string;
  }[];
  score: number;
  timeSpent: number; // total time in seconds
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

const progressSchema = new Schema<IProgress>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: Schema.Types.ObjectId, ref: 'Exam', required: true },
  answers: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    selectedAnswer: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    timeSpent: { type: Number, required: true },
    note: String
  }],
  score: { type: Number, required: true },
  timeSpent: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  startedAt: { type: Date, default: Date.now },
  completedAt: Date
});

export const Progress = mongoose.model<IProgress>('Progress', progressSchema);
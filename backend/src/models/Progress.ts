import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  user: mongoose.Types.ObjectId;
  exam: mongoose.Types.ObjectId;
  score: number;
  timeSpent: number;
  completed: boolean;
  answers: {
    questionId: mongoose.Types.ObjectId;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  completedAt?: Date;
}

const progressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  timeSpent: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  answers: [{
    questionId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    selectedAnswer: {
      type: Number,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    }
  }],
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

export const Progress = mongoose.model<IProgress>('Progress', progressSchema);
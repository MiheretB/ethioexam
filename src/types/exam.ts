export interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
  progress?: number;
  pdfUrl?: string;
}
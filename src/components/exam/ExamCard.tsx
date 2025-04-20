import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  LinearProgress,
} from '@mui/material';
import { Timer, Book } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    subject: string;
    duration: number;
    totalQuestions: number;
    difficulty: 'easy' | 'medium' | 'hard';
    progress?: number;
  };
}

export const ExamCard = ({ exam }: ExamCardProps) => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {exam.title}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip
            label={exam.subject}
            color="primary"
            size="small"
            icon={<Book />}
            sx={{ mr: 1 }}
          />
          <Chip
            label={exam.difficulty}
            color={getDifficultyColor(exam.difficulty)}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Timer sx={{ mr: 1, fontSize: 'small' }} />
          <Typography variant="body2" color="textSecondary">
            {exam.duration} minutes
          </Typography>
        </Box>

        <Typography variant="body2" color="textSecondary">
          {exam.totalQuestions} Questions
        </Typography>

        {exam.progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Progress: {exam.progress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={exam.progress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/exam/${exam.id}`)}
        >
          {exam.progress ? 'Continue' : 'Start Exam'}
        </Button>
        <Button size="small" color="secondary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};
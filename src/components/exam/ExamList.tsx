import React from 'react';
import {
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from '@mui/material';
import { ExamCard } from './ExamCard';

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
  difficulty: string;
  progress: number;
}

export const ExamList = () => {
  const [loading, setLoading] = React.useState(true);
  const [exams, setExams] = React.useState<Exam[]>([]);
  const [filters, setFilters] = React.useState({
    subject: '',
    difficulty: '',
    sort: 'newest',
  });

  React.useEffect(() => {
    fetchExams();
  }, [filters]);

  const fetchExams = async () => {
    try {
      // TODO: Implement API call to fetch exams with filters
      setExams([
        {
          id: '1',
          title: 'Physics Mechanics',
          subject: 'Physics',
          duration: 60,
          totalQuestions: 30,
          difficulty: 'medium',
          progress: 45,
        },
        // Add more mock exams...
      ]);
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Available Exams
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Subject</InputLabel>
            <Select
              value={filters.subject}
              onChange={(e) =>
                setFilters({ ...filters, subject: e.target.value })
              }
            >
              <MenuItem value="">All Subjects</MenuItem>
              <MenuItem value="physics">Physics</MenuItem>
              <MenuItem value="chemistry">Chemistry</MenuItem>
              <MenuItem value="biology">Biology</MenuItem>
              <MenuItem value="mathematics">Mathematics</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({ ...filters, difficulty: e.target.value })
              }
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={filters.sort}
              onChange={(e) =>
                setFilters({ ...filters, sort: e.target.value })
              }
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="oldest">Oldest First</MenuItem>
              <MenuItem value="difficulty">Difficulty</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {exams.map((exam: any) => (
          <Grid item xs={12} sm={6} md={4} key={exam.id}>
            <ExamCard exam={exam} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
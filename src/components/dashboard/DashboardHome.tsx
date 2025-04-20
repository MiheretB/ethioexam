import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Progress
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Physics
              </Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Chemistry
              </Typography>
              <LinearProgress
                variant="determinate"
                value={60}
                sx={{ height: 10, borderRadius: 5 }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/progress')}
            >
              View Detailed Progress
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}
              onClick={() => navigate('/exams')}
            >
              Take an Exam
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/schedule')}
            >
              View Schedule
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Stats
            </Typography>
            <Typography variant="body1">
              Exams Completed: <strong>12</strong>
            </Typography>
            <Typography variant="body1">
              Average Score: <strong>85%</strong>
            </Typography>
            <Typography variant="body1">
              Study Hours: <strong>24</strong>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
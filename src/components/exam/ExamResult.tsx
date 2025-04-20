import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Check,
  Close,
  Timeline,
  Timer,
  TrendingUp,
  School,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

export const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions, timeSpent } = location.state || {};

  const calculateResults = () => {
    const correct = answers.filter(
      (answer: number, index: number) => answer === questions[index].correctAnswer
    ).length;
    const score = (correct / questions.length) * 100;
    return {
      score,
      correct,
      total: questions.length,
      timeSpent,
    };
  };

  const results = calculateResults();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Exam Results
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={results.score}
                  size={120}
                  thickness={4}
                  color={results.score >= 70 ? 'success' : 'error'}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4">
                    {Math.round(results.score)}%
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {results.correct} out of {results.total} correct
              </Typography>
            </Box>

            <List>
              {questions.map((question: any, index: number) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {answers[index] === question.correctAnswer ? (
                        <Check color="success" />
                      ) : (
                        <Close color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={question.text.en}
                      secondary={
                        answers[index] !== question.correctAnswer
                          ? `Correct answer: ${
                              question.options.en[question.correctAnswer]
                            }`
                          : undefined
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Timer />
                </ListItemIcon>
                <ListItemText
                  primary="Time Spent"
                  secondary={`${Math.floor(timeSpent / 60)} minutes`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Timeline />
                </ListItemIcon>
                <ListItemText
                  primary="Accuracy"
                  secondary={`${Math.round(
                    (results.correct / results.total) * 100
                  )}%`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText
                  primary="Performance"
                  secondary={
                    results.score >= 70
                      ? 'Excellent'
                      : results.score >= 50
                      ? 'Good'
                      : 'Needs Improvement'
                  }
                />
              </ListItem>
            </List>
          </Paper>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<School />}
            onClick={() => navigate('/dashboard')}
            sx={{ mb: 2 }}
          >
            Back to Dashboard
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
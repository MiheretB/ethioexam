import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Grid,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Timer,
  BookmarkBorder,
  Bookmark,
  NavigateNext,
  NavigateBefore,
} from '@mui/icons-material';
import { PDFViewer } from './PDFViewer';
import { useParams, useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  text: { en: string; am: string };
  options: { en: string[]; am: string[] };
  correctAnswer: number;
  explanation: { en: string; am: string };
  pdfPage?: number;
  pdfUrl?: string;
}

export const ExamSession = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [showConfirmEnd, setShowConfirmEnd] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    fetchExamData();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleExamEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchExamData = async () => {
    try {
      // TODO: Implement API call to fetch exam data
      setQuestions([
        // Mock questions
        {
          id: '1',
          text: {
            en: 'What is the capital of Ethiopia?',
            am: 'የኢትዮጵያ ዋና ከተማ የት ነው?'
          },
          options: {
            en: ['Addis Ababa', 'Dire Dawa', 'Bahir Dar', 'Hawassa'],
            am: ['አዲስ አበባ', 'ድሬዳዋ', 'ባህር ዳር', 'ሀዋሳ']
          },
          correctAnswer: 0,
          explanation: {
            en: 'Addis Ababa is the capital city of Ethiopia.',
            am: 'አዲስ አበባ የኢትዮጵያ ዋና ከተማ ነው።'
          }
        },
        // Add more questions...
      ]);
      setSelectedAnswers(new Array(questions.length).fill(null));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exam:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleBookmark = () => {
    const questionId = questions[currentQuestion].id;
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(questionId)) {
      newBookmarks.delete(questionId);
    } else {
      newBookmarks.add(questionId);
    }
    setBookmarks(newBookmarks);
  };

  const handleExamEnd = async () => {
    try {
      // TODO: Implement API call to submit exam
      navigate('/exam-result', {
        state: {
          answers: selectedAnswers,
          questions: questions,
          timeSpent: 3600 - timeLeft,
        },
      });
    } catch (error) {
      console.error('Error submitting exam:', error);
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
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Timer sx={{ mr: 1 }} />
            <Typography>{formatTime(timeLeft)}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowConfirmEnd(true)}
          >
            End Exam
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Question and Answers */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                {questions[currentQuestion].text.en}
              </Typography>
              <Button
                onClick={handleBookmark}
                startIcon={
                  bookmarks.has(questions[currentQuestion].id) ? (
                    <Bookmark />
                  ) : (
                    <BookmarkBorder />
                  )
                }
              >
                Bookmark
              </Button>
            </Box>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {questions[currentQuestion].text.am}
            </Typography>

            <RadioGroup
              value={selectedAnswers[currentQuestion]}
              onChange={(e) => handleAnswerSelect(Number(e.target.value))}
            >
              {questions[currentQuestion].options.en.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography>{option}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {questions[currentQuestion].options.am[index]}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              startIcon={<NavigateBefore />}
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              endIcon={<NavigateNext />}
              disabled={currentQuestion === questions.length - 1}
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
            >
              Next
            </Button>
          </Box>
        </Grid>

        {/* PDF Viewer */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '600px' }}>
            <PDFViewer
              url={questions[currentQuestion].pdfUrl}
              page={questions[currentQuestion].pdfPage}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmEnd} onClose={() => setShowConfirmEnd(false)}>
        <DialogTitle>End Exam?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to end the exam? You cannot return once submitted.
          </Typography>
          <Alert severity="warning" sx={{ mt: 2 }}>
            You have {selectedAnswers.filter((a) => a === null).length} unanswered
            questions.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmEnd(false)}>Cancel</Button>
          <Button onClick={handleExamEnd} color="primary" variant="contained">
            End Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
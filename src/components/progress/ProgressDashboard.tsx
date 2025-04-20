import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Tab,
  Tabs,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface PerformanceData {
  date: string;
  score: number;
}

interface SubjectPerformance {
  subject: string;
  score: number;
  total: number;
}

export const ProgressDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [subjectData, setSubjectData] = useState<SubjectPerformance[]>([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      // TODO: Implement API call to fetch progress data
      // Mock data for now
      setPerformanceData([
        { date: '2024-01-01', score: 75 },
        { date: '2024-01-15', score: 82 },
        { date: '2024-02-01', score: 78 },
        { date: '2024-02-15', score: 85 },
        { date: '2024-03-01', score: 90 },
      ]);

      setSubjectData([
        { subject: 'Physics', score: 85, total: 100 },
        { subject: 'Chemistry', score: 78, total: 100 },
        { subject: 'Biology', score: 92, total: 100 },
        { subject: 'Mathematics', score: 88, total: 100 },
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching progress data:', error);
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Progress Analytics
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Overview" />
        <Tab label="Subject Performance" />
        <Tab label="Time Analysis" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Performance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Subject Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    dataKey="score"
                    nameKey="subject"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {subjectData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              {subjectData.map((subject) => (
                <Grid item xs={12} sm={6} md={3} key={subject.subject}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {subject.subject}
                      </Typography>
                      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress
                          variant="determinate"
                          value={(subject.score / subject.total) * 100}
                          size={80}
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
                          <Typography variant="body2">
                            {Math.round((subject.score / subject.total) * 100)}%
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
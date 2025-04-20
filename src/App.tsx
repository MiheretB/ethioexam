import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { theme } from './styles/theme';

// Import components
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './components/dashboard/DashboardHome';
import { ExamList } from './components/exam/ExamList';
import { ExamSession } from './components/exam/ExamSession';
import { ExamResult } from './components/exam/ExamResult';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { StudyScheduler } from './components/scheduler/StudyScheduler';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <DashboardHome />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/exams"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ExamList />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/exam/:examId"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ExamSession />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/exam-result"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ExamResult />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProgressDashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/schedule"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <StudyScheduler />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
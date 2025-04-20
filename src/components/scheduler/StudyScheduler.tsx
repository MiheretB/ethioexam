import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  startTime: Date | null;
  duration: number;
  completed: boolean;
}

export const StudyScheduler = () => {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSession, setEditingSession] = useState<StudySession | null>(null);
  const [newSession, setNewSession] = useState<StudySession>({
    id: Math.random().toString(),
    subject: '',
    topic: '',
    startTime: null,
    duration: 60,
    completed: false
  });

  const handleAddSession = () => {
    if (editingSession) {
      setSessions(
        sessions.map((session) =>
          session.id === editingSession.id ? { ...newSession } : session
        )
      );
    } else {
      setSessions([
        ...sessions,
        { ...newSession }
      ]);
    }
    handleCloseDialog();
  };

  const handleEditSession = (session: StudySession) => {
    setEditingSession(session);
    setNewSession(session);
    setOpenDialog(true);
  };

  const handleDeleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSession(null);
    resetForm();
  };

  const resetForm = () => {
    setNewSession({
      id: Math.random().toString(),
      subject: '',
      topic: '',
      startTime: null,
      duration: 60,
      completed: false
    });
  };

  const handleToggleComplete = (id: string) => {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">Study Schedule</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Add Study Session
          </Button>
        </Box>

        <List>
          {sessions.map((session) => (
            <ListItem
              key={session.id}
              sx={{
                mb: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
              }}
            >
              <Checkbox
                checked={session.completed}
                onChange={() => handleToggleComplete(session.id)}
              />
              <ListItemText
                primary={`${session.subject} - ${session.topic}`}
                secondary={`${session.startTime?.toLocaleString()} (${
                  session.duration
                } minutes)`}
                sx={{
                  textDecoration: session.completed ? 'line-through' : 'none',
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditSession(session)}
                  sx={{ mr: 1 }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteSession(session.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingSession ? 'Edit Study Session' : 'Add Study Session'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Subject"
              value={newSession.subject}
              onChange={(e) =>
                setNewSession({ ...newSession, subject: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Topic"
              value={newSession.topic}
              onChange={(e) =>
                setNewSession({ ...newSession, topic: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start Time"
                value={newSession.startTime}
                onChange={(date) =>
                  setNewSession({ ...newSession, startTime: date })
                }
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={newSession.duration}
              onChange={(e) =>
                setNewSession({
                  ...newSession,
                  duration: parseInt(e.target.value) || 0,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddSession} variant="contained" color="primary">
            {editingSession ? 'Save Changes' : 'Add Session'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
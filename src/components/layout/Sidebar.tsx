import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import {
  School,
  Assignment,
  BookmarkBorder,
  Timeline,
  Schedule,
  Chat,
  MenuBook,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

export const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <School />, path: '/dashboard' },
    { text: 'Exams', icon: <Assignment />, path: '/exams' },
    { text: 'Bookmarks', icon: <BookmarkBorder />, path: '/bookmarks' },
    { text: 'Progress', icon: <Timeline />, path: '/progress' },
    { text: 'Study Schedule', icon: <Schedule />, path: '/schedule' },
    { text: 'Study Materials', icon: <MenuBook />, path: '/materials' },
    { text: 'Discussion', icon: <Chat />, path: '/discussion' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          EthioExam
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.stream} Stream - Grade {user?.grade}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
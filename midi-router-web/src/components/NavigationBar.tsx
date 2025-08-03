import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  Settings as SetupIcon,
  Hub as StudioIcon,
  Gamepad as StageIcon,
} from '@mui/icons-material';
import { useStudio } from '../hooks/useStudio';

export const NavigationBar: React.FC = () => {
  const { currentView, setCurrentView, activePreset } = useStudio();

  const handleViewChange = (view: 'setup' | 'studio' | 'stage') => {
    setCurrentView(view);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MIDI Router
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
          <Button
            startIcon={<SetupIcon />}
            variant={currentView === 'setup' ? 'contained' : 'text'}
            onClick={() => handleViewChange('setup')}
            color="inherit"
          >
            Setup
          </Button>
          <Button
            startIcon={<StudioIcon />}
            variant={currentView === 'studio' ? 'contained' : 'text'}
            onClick={() => handleViewChange('studio')}
            color="inherit"
          >
            Studio
          </Button>
          <Button
            startIcon={<StageIcon />}
            variant={currentView === 'stage' ? 'contained' : 'text'}
            onClick={() => handleViewChange('stage')}
            color="inherit"
          >
            Stage
          </Button>
        </Box>

        {activePreset && (
          <Chip
            label={`Active: ${activePreset.name}`}
            color="secondary"
            size="small"
          />
        )}
      </Toolbar>
    </AppBar>
  );
};
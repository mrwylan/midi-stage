import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { RoutingCanvas } from '../components/RoutingCanvas';
import { PropertiesEditor } from '../components/PropertiesEditor';

export const StudioView: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Studio: Design Your Signal Flow
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create visual MIDI routing connections between your devices and configure filters and mappings.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Routing Canvas
            </Typography>
            <RoutingCanvas />
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <PropertiesEditor />
        </Grid>
      </Grid>
    </Box>
  );
};
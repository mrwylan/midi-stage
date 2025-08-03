import React from 'react';
import { Box, Typography, Grid, Paper, Alert } from '@mui/material';
import { PresetBrowser } from '../components/PresetBrowser';
import { CustomControlSurface } from '../components/CustomControlSurface';
import { useStudio } from '../hooks/useStudio';

export const StageView: React.FC = () => {
  const { activePreset } = useStudio();

  const handleControlChange = (controlId: string, value: number) => {
    console.log(`Control ${controlId} changed to ${value}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stage: Live Performance
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Touch-friendly controls for live performance. Load presets and interact with your custom control surfaces.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PresetBrowser />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Controls
            </Typography>
            
            {!activePreset ? (
              <Alert severity="info" sx={{ mb: 3 }}>
                Select a preset from the browser to see your custom performance controls.
              </Alert>
            ) : (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Active Preset: {activePreset.name}
                </Typography>
                {activePreset.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {activePreset.description}
                  </Typography>
                )}
              </Box>
            )}

            <CustomControlSurface
              controls={activePreset?.stageControls || []}
              onControlChange={handleControlChange}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
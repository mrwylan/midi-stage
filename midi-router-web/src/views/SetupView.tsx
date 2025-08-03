import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { DeviceLibraryList } from '../components/DeviceLibraryList';
import { AddDeviceForm } from '../components/AddDeviceForm';

export const SetupView: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Setup: Define Your Gear
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create a library of your MIDI devices and define meaningful labels for their controls.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AddDeviceForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <DeviceLibraryList />
        </Grid>
      </Grid>
    </Box>
  );
};
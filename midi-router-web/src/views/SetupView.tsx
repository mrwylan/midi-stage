import React from 'react';
import { AddDeviceForm } from '../components/AddDeviceForm';
import { DeviceList } from '../components/DeviceList';
import { MidiDeviceDetector } from '../components/MidiDeviceDetector';
import { Box, Grid, Typography } from '@mui/material';

export const SetupView: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Setup Perspective
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DeviceList />
          <AddDeviceForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <MidiDeviceDetector />
        </Grid>
      </Grid>
    </Box>
  );
};

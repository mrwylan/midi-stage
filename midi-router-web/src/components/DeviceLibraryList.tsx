import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useDeviceLibrary } from '../hooks/useDeviceLibrary';
import type { MidiDevice } from '../types';

interface CCMappingDialogProps {
  device: MidiDevice | null;
  open: boolean;
  onClose: () => void;
}

const CCMappingDialog: React.FC<CCMappingDialogProps> = ({ device, open, onClose }) => {
  const { setCCLabel } = useDeviceLibrary();
  const [ccNumber, setCCNumber] = useState<string>('');
  const [ccLabel, setCCLabelState] = useState<string>('');

  const handleAddCC = () => {
    if (device && ccNumber && ccLabel) {
      const cc = parseInt(ccNumber, 10);
      if (cc >= 0 && cc <= 127) {
        setCCLabel(device.id, cc, ccLabel);
        setCCNumber('');
        setCCLabelState('');
      }
    }
  };

  const handleRemoveCC = (cc: number) => {
    if (device) {
      setCCLabel(device.id, cc, '');
    }
  };

  if (!device) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>CC Mappings for {device.customName || device.name}</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="end">
            <Grid item xs={4}>
              <TextField
                label="CC Number"
                type="number"
                value={ccNumber}
                onChange={(e) => setCCNumber(e.target.value)}
                inputProps={{ min: 0, max: 127 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CC Label"
                value={ccLabel}
                onChange={(e) => setCCLabelState(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                onClick={handleAddCC}
                disabled={!ccNumber || !ccLabel}
                fullWidth
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
        
        <Typography variant="h6" gutterBottom>
          Current Mappings
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(device.ccMappings).map(([cc, label]) => (
            <Chip
              key={cc}
              label={`CC${cc}: ${label}`}
              onDelete={() => handleRemoveCC(parseInt(cc, 10))}
              variant="outlined"
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeviceLibraryList: React.FC = () => {
  const { libraryDevices, removeDevice } = useDeviceLibrary();
  const [selectedDevice, setSelectedDevice] = useState<MidiDevice | null>(null);
  const [ccDialogOpen, setCCDialogOpen] = useState(false);

  const handleEditCC = (device: MidiDevice) => {
    setSelectedDevice(device);
    setCCDialogOpen(true);
  };

  const handleCloseCCDialog = () => {
    setCCDialogOpen(false);
    setSelectedDevice(null);
  };

  const getDeviceTypeColor = (type: string) => {
    switch (type) {
      case 'input':
        return 'primary';
      case 'output':
        return 'secondary';
      case 'both':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Device Library
          </Typography>
          {libraryDevices.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No devices in library. Add devices to get started.
            </Typography>
          ) : (
            <List>
              {libraryDevices.map((device) => (
                <ListItem key={device.id} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {device.customName || device.name}
                        </Typography>
                        <Chip
                          label={device.type}
                          size="small"
                          color={getDeviceTypeColor(device.type) as 'primary' | 'secondary' | 'success' | 'default'}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {device.manufacturer && `${device.manufacturer} • `}
                          {Object.keys(device.ccMappings).length} CC mappings
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditCC(device)}
                      sx={{ mr: 1 }}
                    >
                      <SettingsIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => removeDevice(device.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      <CCMappingDialog
        device={selectedDevice}
        open={ccDialogOpen}
        onClose={handleCloseCCDialog}
      />
    </>
  );
};
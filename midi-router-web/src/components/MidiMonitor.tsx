import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Clear as ClearIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { useMidiStore } from '../state/midiStore';
import type { MidiMessage } from '../types';

const formatMidiMessage = (message: MidiMessage): string => {
  switch (message.type) {
    case 'noteOn':
      return `Note On: ${message.note} (vel: ${message.velocity})`;
    case 'noteOff':
      return `Note Off: ${message.note}`;
    case 'controlChange':
      return `CC ${message.controller}: ${message.value}`;
    case 'programChange':
      return `Program Change: ${message.program}`;
    case 'pitchBend':
      return `Pitch Bend: ${message.value}`;
    default:
      return `${message.type}`;
  }
};

const getMessageTypeColor = (type: string) => {
  switch (type) {
    case 'noteOn':
      return 'success';
    case 'noteOff':
      return 'default';
    case 'controlChange':
      return 'primary';
    case 'programChange':
      return 'secondary';
    case 'pitchBend':
      return 'warning';
    default:
      return 'default';
  }
};

export const MidiMonitor: React.FC = () => {
  const { messages, isMonitoring, setMonitoring, clearMessages } = useMidiStore();
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDevice, setFilterDevice] = useState<string>('all');

  const filteredMessages = messages.filter((message) => {
    if (filterType !== 'all' && message.type !== filterType) {
      return false;
    }
    if (filterDevice !== 'all' && message.deviceId !== filterDevice) {
      return false;
    }
    return true;
  });

  const uniqueDevices = Array.from(new Set(messages.map((m) => m.deviceId)));
  const messageTypes = ['noteOn', 'noteOff', 'controlChange', 'programChange', 'pitchBend'];

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            MIDI Monitor
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => setMonitoring(!isMonitoring)}
              color={isMonitoring ? 'primary' : 'default'}
            >
              {isMonitoring ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            <IconButton onClick={clearMessages}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Message Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Message Type"
            >
              <MenuItem value="all">All Types</MenuItem>
              {messageTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Device</InputLabel>
            <Select
              value={filterDevice}
              onChange={(e) => setFilterDevice(e.target.value)}
              label="Device"
            >
              <MenuItem value="all">All Devices</MenuItem>
              {uniqueDevices.map((deviceId) => (
                <MenuItem key={deviceId} value={deviceId}>
                  {deviceId.substring(0, 20)}...
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredMessages.length} messages
            {filterType !== 'all' || filterDevice !== 'all' ? ' (filtered)' : ''}
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isMonitoring}
                onChange={(e) => setMonitoring(e.target.checked)}
                size="small"
              />
            }
            label="Monitor"
          />
        </Box>

        <Box
          sx={{
            maxHeight: 300,
            overflow: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          {filteredMessages.length === 0 ? (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {isMonitoring ? 'No MIDI messages received yet' : 'Monitoring is paused'}
              </Typography>
            </Box>
          ) : (
            <List dense>
              {filteredMessages.slice(0, 100).map((message) => (
                <ListItem key={message.id} divider>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={message.type}
                          size="small"
                          color={getMessageTypeColor(message.type) as 'primary' | 'secondary' | 'success' | 'default' | 'warning'}
                        />
                        <Typography variant="body2">
                          {formatMidiMessage(message)}
                        </Typography>
                        {message.channel && (
                          <Chip
                            label={`Ch ${message.channel}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {new Date(message.timestamp).toLocaleTimeString()} • {message.deviceId.substring(0, 30)}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
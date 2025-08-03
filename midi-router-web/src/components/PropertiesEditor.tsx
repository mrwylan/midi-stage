import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { useMidiStore } from '../state/midiStore';
import type { MidiFilter } from '../types';

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (filter: Omit<MidiFilter, 'id'>) => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({ open, onClose, onAdd }) => {
  const [type, setType] = useState<MidiFilter['type']>('messageType');
  const [condition, setCondition] = useState<MidiFilter['condition']>('include');
  const [value, setValue] = useState<string>('');

  const handleAdd = () => {
    if (value) {
      onAdd({
        type,
        condition,
        value: type === 'messageType' ? value : parseInt(value, 10),
      });
      setValue('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add MIDI Filter</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Filter Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as MidiFilter['type'])}>
              <MenuItem value="messageType">Message Type</MenuItem>
              <MenuItem value="channel">Channel</MenuItem>
              <MenuItem value="note">Note</MenuItem>
              <MenuItem value="controller">Controller</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Condition</InputLabel>
            <Select value={condition} onChange={(e) => setCondition(e.target.value as MidiFilter['condition'])}>
              <MenuItem value="include">Include</MenuItem>
              <MenuItem value="exclude">Exclude</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              type === 'messageType'
                ? 'noteOn, noteOff, controlChange, etc.'
                : type === 'channel'
                ? '1-16'
                : type === 'note'
                ? '0-127'
                : '0-127'
            }
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained" disabled={!value}>
          Add Filter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const PropertiesEditor: React.FC = () => {
  const { connections, updateConnection } = useMidiStore();
  const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const selectedConnection = connections.find((c) => c.id === selectedConnectionId);

  const handleAddFilter = (filter: Omit<MidiFilter, 'id'>) => {
    if (selectedConnectionId) {
      const newFilter = {
        ...filter,
        id: `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      
      const connection = connections.find((c) => c.id === selectedConnectionId);
      if (connection) {
        updateConnection(selectedConnectionId, {
          filters: [...connection.filters, newFilter],
        });
      }
    }
  };

  const handleRemoveFilter = (filterId: string) => {
    if (selectedConnectionId) {
      const connection = connections.find((c) => c.id === selectedConnectionId);
      if (connection) {
        updateConnection(selectedConnectionId, {
          filters: connection.filters.filter((f) => f.id !== filterId),
        });
      }
    }
  };

  const getFilterDescription = (filter: MidiFilter): string => {
    const conditionText = filter.condition === 'include' ? 'Include' : 'Exclude';
    return `${conditionText} ${filter.type}: ${filter.value}`;
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Connection Properties
          </Typography>

          {connections.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No connections created yet. Connect devices in the routing canvas to configure filters and mappings.
            </Typography>
          ) : (
            <>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Connection</InputLabel>
                <Select
                  value={selectedConnectionId || ''}
                  onChange={(e) => setSelectedConnectionId(e.target.value)}
                >
                  {connections.map((connection) => (
                    <MenuItem key={connection.id} value={connection.id}>
                      Connection {connection.sourceId} → {connection.targetId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedConnection && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1">Filters</Typography>
                    <Button
                      startIcon={<AddIcon />}
                      onClick={() => setFilterDialogOpen(true)}
                      size="small"
                    >
                      Add Filter
                    </Button>
                  </Box>

                  {selectedConnection.filters.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      No filters applied. All MIDI messages will pass through.
                    </Typography>
                  ) : (
                    <Box sx={{ mb: 3 }}>
                      {selectedConnection.filters.map((filter) => (
                        <Chip
                          key={filter.id}
                          label={getFilterDescription(filter)}
                          onDelete={() => handleRemoveFilter(filter.id)}
                          sx={{ m: 0.5 }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>
                    Message Mappings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Advanced message transformations (coming soon)
                  </Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <FilterDialog
        open={filterDialogOpen}
        onClose={() => setFilterDialogOpen(false)}
        onAdd={handleAddFilter}
      />
    </>
  );
};
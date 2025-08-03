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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
} from '@mui/icons-material';
import { useStudio } from '../hooks/useStudio';

interface NewPresetDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const NewPresetDialog: React.FC<NewPresetDialogProps> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim(), description.trim());
      setName('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Preset</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Preset Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" disabled={!name.trim()}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const PresetBrowser: React.FC = () => {
  const {
    presets,
    activePresetId,
    createPreset,
    removePreset,
    loadPreset,
    duplicatePreset,
  } = useStudio();
  const [newPresetDialogOpen, setNewPresetDialogOpen] = useState(false);

  const handleCreatePreset = (name: string, description: string) => {
    createPreset({ name, description });
  };

  const handleLoadPreset = (presetId: string) => {
    loadPreset(presetId);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Presets
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={() => setNewPresetDialogOpen(true)}
              variant="contained"
              size="small"
            >
              New Preset
            </Button>
          </Box>

          {presets.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No presets created yet. Create your first preset to get started.
            </Typography>
          ) : (
            <List>
              {presets.map((preset) => (
                <ListItem
                  key={preset.id}
                  divider
                  sx={{
                    border: activePresetId === preset.id ? 2 : 0,
                    borderColor: 'primary.main',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1">
                          {preset.name}
                        </Typography>
                        {activePresetId === preset.id && (
                          <Chip label="Active" size="small" color="primary" />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        {preset.description && (
                          <Typography variant="body2" color="text.secondary">
                            {preset.description}
                          </Typography>
                        )}
                        <Typography variant="caption" color="text.secondary">
                          {preset.devices.length} devices • {preset.connections.length} connections • {preset.stageControls.length} controls
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleLoadPreset(preset.id)}
                      color={activePresetId === preset.id ? 'primary' : 'default'}
                      disabled={activePresetId === preset.id}
                      sx={{ mr: 1 }}
                    >
                      <PlayIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => duplicatePreset(preset.id)}
                      sx={{ mr: 1 }}
                    >
                      <CopyIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => removePreset(preset.id)}
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

      <NewPresetDialog
        open={newPresetDialogOpen}
        onClose={() => setNewPresetDialogOpen(false)}
        onCreate={handleCreatePreset}
      />
    </>
  );
};
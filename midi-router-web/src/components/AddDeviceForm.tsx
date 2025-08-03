import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useDeviceLibrary } from '../hooks/useDeviceLibrary';

export const AddDeviceForm: React.FC = () => {
  const { createDevice } = useDeviceLibrary();
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    customName: '',
    color: '#6366f1',
    type: 'both' as 'input' | 'output' | 'both',
  });
  const [error, setError] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Device name is required');
      return;
    }

    try {
      createDevice({
        name: formData.name.trim(),
        manufacturer: formData.manufacturer.trim() || undefined,
        customName: formData.customName.trim() || undefined,
        color: formData.color,
        type: formData.type,
      });

      // Reset form
      setFormData({
        name: '',
        manufacturer: '',
        customName: '',
        color: '#6366f1',
        type: 'both',
      });
      
      setError('');
    } catch {
      setError('Failed to create device');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add New Device
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Device Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            fullWidth
            placeholder="e.g., My Synthesizer"
          />

          <TextField
            label="Manufacturer"
            value={formData.manufacturer}
            onChange={(e) => handleInputChange('manufacturer', e.target.value)}
            fullWidth
            placeholder="e.g., Moog, Roland, Yamaha"
          />

          <TextField
            label="Custom Display Name"
            value={formData.customName}
            onChange={(e) => handleInputChange('customName', e.target.value)}
            fullWidth
            placeholder="e.g., Lead Synth, Bass Module"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <MenuItem value="input">Input Only</MenuItem>
                <MenuItem value="output">Output Only</MenuItem>
                <MenuItem value="both">Input & Output</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Color:</Typography>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                style={{
                  width: 40,
                  height: 40,
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                }}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 1 }}
          >
            Add Device
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
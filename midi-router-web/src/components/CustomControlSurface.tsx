import React from 'react';
import {
  Box,
  Button,
  Slider,
  Typography,
  Paper,
} from '@mui/material';
import { VolumeUp as VolumeIcon } from '@mui/icons-material';
import type { StageControl } from '../types';
import { useMidi } from '../hooks/useMidi';

interface CustomControlSurfaceProps {
  controls: StageControl[];
  onControlChange?: (controlId: string, value: number) => void;
}

interface StageButtonProps {
  control: StageControl;
  onPress: () => void;
}

const StageButton: React.FC<StageButtonProps> = ({ control, onPress }) => {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={onPress}
      sx={{
        position: 'absolute',
        left: control.x,
        top: control.y,
        width: control.width,
        height: control.height,
        fontSize: '1.2rem',
        fontWeight: 'bold',
        borderRadius: 2,
        minHeight: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {control.label}
    </Button>
  );
};

interface StageSliderProps {
  control: StageControl;
  onChange: (value: number) => void;
}

const StageSlider: React.FC<StageSliderProps> = ({ control, onChange }) => {
  const [value, setValue] = React.useState(control.value || 0);

  const handleChange = (_: Event, newValue: number | number[]) => {
    const val = Array.isArray(newValue) ? newValue[0] : newValue;
    setValue(val);
    onChange(val);
  };

  return (
    <Paper
      sx={{
        position: 'absolute',
        left: control.x,
        top: control.y,
        width: control.width,
        height: control.height,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <Typography variant="body2" fontWeight="bold" textAlign="center">
        {control.label}
      </Typography>
      <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Slider
          orientation={control.height > control.width ? 'vertical' : 'horizontal'}
          value={value}
          onChange={handleChange}
          min={control.minValue || 0}
          max={control.maxValue || 127}
          sx={{
            height: control.height > control.width ? '80%' : undefined,
            width: control.height > control.width ? undefined : '80%',
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
            },
          }}
        />
      </Box>
      <Typography variant="caption" color="text.secondary">
        {value}
      </Typography>
    </Paper>
  );
};

export const CustomControlSurface: React.FC<CustomControlSurfaceProps> = ({
  controls,
  onControlChange,
}) => {
  const { sendMessage } = useMidi();

  const handleButtonPress = (control: StageControl) => {
    const { midiMessage } = control;
    
    let midiData: number[] = [];

    switch (midiMessage.type) {
      case 'noteOn':
        if (midiMessage.channel && midiMessage.note !== undefined) {
          midiData = [0x90 + (midiMessage.channel - 1), midiMessage.note, 127];
        }
        break;
      case 'noteOff':
        if (midiMessage.channel && midiMessage.note !== undefined) {
          midiData = [0x80 + (midiMessage.channel - 1), midiMessage.note, 0];
        }
        break;
      case 'programChange':
        if (midiMessage.channel && midiMessage.program !== undefined) {
          midiData = [0xC0 + (midiMessage.channel - 1), midiMessage.program];
        }
        break;
    }

    if (midiData.length > 0) {
      sendMessage(control.targetDeviceId, midiData);
    }

    onControlChange?.(control.id, 1);
  };

  const handleSliderChange = (control: StageControl, value: number) => {
    const { midiMessage } = control;
    
    if (midiMessage.type === 'controlChange' && midiMessage.channel && midiMessage.controller !== undefined) {
      const midiData = [0xB0 + (midiMessage.channel - 1), midiMessage.controller, Math.round(value)];
      sendMessage(control.targetDeviceId, midiData);
    }

    onControlChange?.(control.id, value);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        border: '2px dashed',
        borderColor: 'primary.main',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      {controls.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <VolumeIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
          <Typography variant="h6" color="text.secondary">
            No stage controls configured
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Add buttons and sliders to create your custom performance interface
          </Typography>
        </Box>
      ) : (
        controls.map((control) => {
          if (control.type === 'button') {
            return (
              <StageButton
                key={control.id}
                control={control}
                onPress={() => handleButtonPress(control)}
              />
            );
          } else if (control.type === 'slider') {
            return (
              <StageSlider
                key={control.id}
                control={control}
                onChange={(value) => handleSliderChange(control, value)}
              />
            );
          }
          return null;
        })
      )}
    </Box>
  );
};
export interface MidiDevice {
  id: string;
  name: string;
  manufacturer?: string;
  customName?: string;
  color?: string;
  type: 'input' | 'output' | 'both';
  ccMappings: Record<number, string>;
}

export interface MidiMessage {
  id: string;
  timestamp: number;
  data: Uint8Array;
  type: 'noteOn' | 'noteOff' | 'controlChange' | 'programChange' | 'pitchBend' | 'sysex' | 'other';
  channel?: number;
  note?: number;
  velocity?: number;
  controller?: number;
  value?: number;
  program?: number;
  deviceId: string;
}

export interface MidiConnection {
  id: string;
  sourceId: string;
  targetId: string;
  filters: MidiFilter[];
  mappings: MidiMapping[];
}

export interface MidiFilter {
  id: string;
  type: 'messageType' | 'channel' | 'note' | 'controller';
  condition: 'include' | 'exclude';
  value: number | number[] | string;
}

export interface MidiMapping {
  id: string;
  sourceType: string;
  targetType: string;
  sourceValue?: number;
  targetValue?: number;
}

export interface Preset {
  id: string;
  name: string;
  description?: string;
  devices: MidiDevice[];
  connections: MidiConnection[];
  stageControls: StageControl[];
}

export interface StageControl {
  id: string;
  type: 'button' | 'slider' | 'knob';
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetDeviceId: string;
  midiMessage: {
    type: string;
    channel?: number;
    controller?: number;
    note?: number;
    program?: number;
  };
  value?: number;
  minValue?: number;
  maxValue?: number;
}
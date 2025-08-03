import type { MidiDevice, MidiMessage } from '../types';

export class MidiService {
  private midiAccess: MIDIAccess | null = null;
  private connectedDevices: Map<string, MidiDevice> = new Map();
  private messageListeners: ((message: MidiMessage) => void)[] = [];
  private deviceChangeListeners: ((devices: MidiDevice[]) => void)[] = [];

  async initialize(): Promise<boolean> {
    try {
      if (!navigator.requestMIDIAccess) {
        console.error('Web MIDI API not supported');
        return false;
      }

      this.midiAccess = await navigator.requestMIDIAccess();
      this.midiAccess.onstatechange = this.handleStateChange.bind(this);
      
      this.scanDevices();
      return true;
    } catch (error) {
      console.error('Failed to initialize MIDI:', error);
      return false;
    }
  }

  private handleStateChange = () => {
    this.scanDevices();
  };

  private scanDevices() {
    if (!this.midiAccess) return;

    const newDevices: Map<string, MidiDevice> = new Map();

    // Scan inputs
    this.midiAccess.inputs.forEach((input) => {
      const device: MidiDevice = {
        id: input.id,
        name: input.name || 'Unknown Input',
        manufacturer: input.manufacturer || undefined,
        type: 'input',
        ccMappings: {}
      };
      
      newDevices.set(input.id, device);
      
      // Set up message listener
      input.onmidimessage = (event) => {
        if (event.data) {
          const message = this.parseMidiMessage(event.data, input.id);
          this.notifyMessageListeners(message);
        }
      };
    });

    // Scan outputs
    this.midiAccess.outputs.forEach((output) => {
      const existingDevice = newDevices.get(output.id);
      if (existingDevice) {
        existingDevice.type = 'both';
      } else {
        const device: MidiDevice = {
          id: output.id,
          name: output.name || 'Unknown Output',
          manufacturer: output.manufacturer || undefined,
          type: 'output',
          ccMappings: {}
        };
        newDevices.set(output.id, device);
      }
    });

    this.connectedDevices = newDevices;
    this.notifyDeviceChangeListeners();
  }

  private parseMidiMessage(data: Uint8Array, deviceId: string): MidiMessage {
    const timestamp = Date.now();
    const id = `${deviceId}-${timestamp}-${Math.random()}`;
    
    const status = data[0];
    const messageType = status & 0xF0;
    const channel = (status & 0x0F) + 1;

    let type: MidiMessage['type'] = 'other';
    let note: number | undefined;
    let velocity: number | undefined;
    let controller: number | undefined;
    let value: number | undefined;
    let program: number | undefined;

    switch (messageType) {
      case 0x80: // Note Off
        type = 'noteOff';
        note = data[1];
        velocity = data[2];
        break;
      case 0x90: // Note On
        type = data[2] > 0 ? 'noteOn' : 'noteOff';
        note = data[1];
        velocity = data[2];
        break;
      case 0xB0: // Control Change
        type = 'controlChange';
        controller = data[1];
        value = data[2];
        break;
      case 0xC0: // Program Change
        type = 'programChange';
        program = data[1];
        break;
      case 0xE0: // Pitch Bend
        type = 'pitchBend';
        value = (data[2] << 7) | data[1];
        break;
      case 0xF0: // System messages
        if (status === 0xF0) {
          type = 'sysex';
        }
        break;
    }

    return {
      id,
      timestamp,
      data,
      type,
      channel,
      note,
      velocity,
      controller,
      value,
      program,
      deviceId
    };
  }

  sendMessage(deviceId: string, data: number[]): boolean {
    if (!this.midiAccess) return false;

    const output = this.midiAccess.outputs.get(deviceId);
    if (!output) return false;

    try {
      output.send(data);
      return true;
    } catch (error) {
      console.error('Failed to send MIDI message:', error);
      return false;
    }
  }

  getConnectedDevices(): MidiDevice[] {
    return Array.from(this.connectedDevices.values());
  }

  getDevice(id: string): MidiDevice | undefined {
    return this.connectedDevices.get(id);
  }

  onMessage(callback: (message: MidiMessage) => void): () => void {
    this.messageListeners.push(callback);
    return () => {
      const index = this.messageListeners.indexOf(callback);
      if (index > -1) {
        this.messageListeners.splice(index, 1);
      }
    };
  }

  onDeviceChange(callback: (devices: MidiDevice[]) => void): () => void {
    this.deviceChangeListeners.push(callback);
    return () => {
      const index = this.deviceChangeListeners.indexOf(callback);
      if (index > -1) {
        this.deviceChangeListeners.splice(index, 1);
      }
    };
  }

  private notifyMessageListeners(message: MidiMessage) {
    this.messageListeners.forEach(listener => listener(message));
  }

  private notifyDeviceChangeListeners() {
    const devices = this.getConnectedDevices();
    this.deviceChangeListeners.forEach(listener => listener(devices));
  }
}

export const midiService = new MidiService();
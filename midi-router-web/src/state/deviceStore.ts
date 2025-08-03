import { create } from 'zustand';
import type { MidiDevice } from '../types';

interface DeviceState {
  connectedDevices: MidiDevice[];
  setConnectedDevices: (devices: MidiDevice[]) => void;
  updateConnectedDevice: (id: string, updates: Partial<MidiDevice>) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  connectedDevices: [],
  
  setConnectedDevices: (devices) =>
    set({ connectedDevices: devices }),

  updateConnectedDevice: (id, updates) =>
    set((state) => ({
      connectedDevices: state.connectedDevices.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      ),
    })),
}));
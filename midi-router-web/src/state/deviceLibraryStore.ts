import { create } from 'zustand';
import { MidiDevice } from './midiStore';

export interface ControllerMap {
  [key: number]: string;
}

export interface DeviceDefinition extends MidiDevice {
  controllerMap: ControllerMap;
}

interface DeviceLibraryState {
  devices: DeviceDefinition[];
  addDevice: (device: DeviceDefinition) => void;
  removeDevice: (deviceId: string) => void;
  updateDevice: (device: DeviceDefinition) => void;
}

export const useDeviceLibraryStore = create<DeviceLibraryState>((set) => ({
  devices: [],
  addDevice: (device) => set((state) => ({ devices: [...state.devices, device] })),
  removeDevice: (deviceId) =>
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== deviceId),
    })),
  updateDevice: (device) =>
    set((state) => ({
      devices: state.devices.map((d) => (d.id === device.id ? device : d)),
    })),
}));

import { create } from 'zustand';

export interface Device {
  id: string;
  name: string;
  color: string;
  ccMap: Record<number, string>;
}

interface DeviceState {
  devices: Device[];
  addDevice: (device: Omit<Device, 'id'>) => void;
  updateDevice: (id: string, updatedDevice: Partial<Omit<Device, 'id'>>) => void;
  removeDevice: (id: string) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, { ...device, id: crypto.randomUUID() }],
    })),
  updateDevice: (id, updatedDevice) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, ...updatedDevice } : d
      ),
    })),
  removeDevice: (id) =>
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== id),
    })),
}));

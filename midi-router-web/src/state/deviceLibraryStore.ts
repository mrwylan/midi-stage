import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MidiDevice } from '../types';

interface DeviceLibraryState {
  libraryDevices: MidiDevice[];
  addDevice: (device: Omit<MidiDevice, 'id'>) => void;
  updateDevice: (id: string, updates: Partial<MidiDevice>) => void;
  removeDevice: (id: string) => void;
  updateCCMapping: (deviceId: string, cc: number, label: string) => void;
  removeCCMapping: (deviceId: string, cc: number) => void;
}

export const useDeviceLibraryStore = create<DeviceLibraryState>()(
  persist(
    (set) => ({
      libraryDevices: [],
      
      addDevice: (deviceData) =>
        set((state) => ({
          libraryDevices: [
            ...state.libraryDevices,
            {
              ...deviceData,
              id: `library-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            },
          ],
        })),

      updateDevice: (id, updates) =>
        set((state) => ({
          libraryDevices: state.libraryDevices.map((device) =>
            device.id === id ? { ...device, ...updates } : device
          ),
        })),

      removeDevice: (id) =>
        set((state) => ({
          libraryDevices: state.libraryDevices.filter((device) => device.id !== id),
        })),

      updateCCMapping: (deviceId, cc, label) =>
        set((state) => ({
          libraryDevices: state.libraryDevices.map((device) =>
            device.id === deviceId
              ? {
                  ...device,
                  ccMappings: {
                    ...device.ccMappings,
                    [cc]: label,
                  },
                }
              : device
          ),
        })),

      removeCCMapping: (deviceId, cc) =>
        set((state) => ({
          libraryDevices: state.libraryDevices.map((device) => {
            if (device.id === deviceId) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { [cc]: _removed, ...remainingMappings } = device.ccMappings;
              return {
                ...device,
                ccMappings: remainingMappings,
              };
            }
            return device;
          }),
        })),
    }),
    {
      name: 'device-library-storage',
    }
  )
);
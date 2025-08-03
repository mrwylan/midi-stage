// src/hooks/useDeviceLibrary.ts
import { useDeviceLibraryStore, DeviceDefinition } from '../state/deviceLibraryStore';

export const useDeviceLibrary = () => {
  const { devices, addDevice, removeDevice, updateDevice } = useDeviceLibraryStore();

  return {
    devices,
    addDevice,
    removeDevice,
    updateDevice,
  };
};

import { useDeviceLibraryStore } from '../state/deviceLibraryStore';
import type { MidiDevice } from '../types';

export const useDeviceLibrary = () => {
  const {
    libraryDevices,
    addDevice,
    updateDevice,
    removeDevice,
    updateCCMapping,
    removeCCMapping,
  } = useDeviceLibraryStore();

  const createDevice = (deviceData: {
    name: string;
    manufacturer?: string;
    customName?: string;
    color?: string;
    type: 'input' | 'output' | 'both';
  }) => {
    const newDevice = {
      ...deviceData,
      ccMappings: {},
    };
    addDevice(newDevice);
  };

  const getDevice = (id: string): MidiDevice | undefined => {
    return libraryDevices.find((device) => device.id === id);
  };

  const updateDeviceInfo = (
    id: string,
    updates: {
      customName?: string;
      color?: string;
    }
  ) => {
    updateDevice(id, updates);
  };

  const setCCLabel = (deviceId: string, cc: number, label: string) => {
    if (label.trim()) {
      updateCCMapping(deviceId, cc, label.trim());
    } else {
      removeCCMapping(deviceId, cc);
    }
  };

  const getCCLabel = (deviceId: string, cc: number): string => {
    const device = getDevice(deviceId);
    return device?.ccMappings[cc] || `CC ${cc}`;
  };

  return {
    libraryDevices,
    createDevice,
    getDevice,
    updateDeviceInfo,
    removeDevice,
    setCCLabel,
    getCCLabel,
  };
};
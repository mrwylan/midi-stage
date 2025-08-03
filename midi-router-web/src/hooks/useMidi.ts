import { useEffect } from 'react';
import { midiService } from '../services/MidiService';
import { useDeviceStore } from '../state/deviceStore';
import { useMidiStore } from '../state/midiStore';

export const useMidi = () => {
  const setConnectedDevices = useDeviceStore((state) => state.setConnectedDevices);
  const addMessage = useMidiStore((state) => state.addMessage);
  const isMonitoring = useMidiStore((state) => state.isMonitoring);

  useEffect(() => {
    let messageUnsubscribe: (() => void) | undefined;
    let deviceUnsubscribe: (() => void) | undefined;

    const initializeMidi = async () => {
      const initialized = await midiService.initialize();
      
      if (initialized) {
        // Set up device change listener
        deviceUnsubscribe = midiService.onDeviceChange((devices) => {
          setConnectedDevices(devices);
        });

        // Set up message listener
        if (isMonitoring) {
          messageUnsubscribe = midiService.onMessage((message) => {
            addMessage(message);
          });
        }

        // Initial device scan
        setConnectedDevices(midiService.getConnectedDevices());
      }
    };

    initializeMidi();

    return () => {
      messageUnsubscribe?.();
      deviceUnsubscribe?.();
    };
  }, [setConnectedDevices, addMessage, isMonitoring]);

  const sendMessage = (deviceId: string, data: number[]) => {
    return midiService.sendMessage(deviceId, data);
  };

  const getConnectedDevices = () => {
    return midiService.getConnectedDevices();
  };

  const getDevice = (id: string) => {
    return midiService.getDevice(id);
  };

  return {
    sendMessage,
    getConnectedDevices,
    getDevice,
  };
};
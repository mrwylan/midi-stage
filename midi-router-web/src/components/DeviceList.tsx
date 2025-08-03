import React from 'react';
import { useDeviceStore } from '../state/deviceStore';

export const DeviceList: React.FC = () => {
  const devices = useDeviceStore((state) => state.devices);

  return (
    <div>
      <h3>Device Library</h3>
      <ul>
        {devices.map((device) => (
          <li key={device.id} style={{ color: device.color }}>
            {device.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

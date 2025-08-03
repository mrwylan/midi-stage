import React from 'react';
import { useDeviceStore } from '../state/deviceStore';
import { useStudioStore } from '../state/studioStore';
import { type Node } from 'reactflow';

export const DeviceLibraryList: React.FC = () => {
  const devices = useDeviceStore((state) => state.devices);
  const addNode = useStudioStore((state) => state.addNode);

  const onAddNode = (deviceName: string) => {
    const newNode: Node = {
      id: crypto.randomUUID(),
      data: { label: deviceName },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    addNode(newNode);
  };

  return (
    <div>
      <h4>Device Library</h4>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} <button onClick={() => onAddNode(device.name)}>Add to Canvas</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

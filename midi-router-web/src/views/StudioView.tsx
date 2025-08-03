import React from 'react';
import { RoutingCanvas } from '../components/RoutingCanvas';
import { DeviceLibraryList } from '../components/DeviceLibraryList';

export const StudioView: React.FC = () => {
  return (
    <div>
      <h2>Studio Perspective</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: '1' }}>
          <RoutingCanvas />
        </div>
        <div style={{ width: '250px' }}>
          <DeviceLibraryList />
        </div>
      </div>
    </div>
  );
};
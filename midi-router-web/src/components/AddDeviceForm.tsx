import React, { useState } from 'react';
import { useDeviceStore } from '../state/deviceStore';

export const AddDeviceForm: React.FC = () => {
  const addDevice = useDeviceStore((state) => state.addDevice);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#ffffff');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addDevice({ name, color, ccMap: {} });
    setName('');
    setColor('#ffffff');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add New Device</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Device Name"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Add Device</button>
    </form>
  );
};

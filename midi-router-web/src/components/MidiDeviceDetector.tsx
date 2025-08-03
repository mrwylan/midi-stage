import React from 'react';
import { useMidiStore } from '../state/midiStore';

export const MidiDeviceDetector: React.FC = () => {
  const { inputs, outputs } = useMidiStore();

  return (
    <div>
      <h4>Detected MIDI Devices</h4>
      <h5>Inputs</h5>
      <ul>
        {inputs.map((input) => (
          <li key={input.id}>{input.name}</li>
        ))}
        {inputs.length === 0 && <li>No MIDI inputs detected.</li>}
      </ul>
      <h5>Outputs</h5>
      <ul>
        {outputs.map((output) => (
          <li key={output.id}>{output.name}</li>
        ))}
        {outputs.length === 0 && <li>No MIDI outputs detected.</li>}
      </ul>
    </div>
  );
};

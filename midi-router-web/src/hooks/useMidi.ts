// src/hooks/useMidi.ts
import { useMidiStore } from '../state/midiStore';

export const useMidi = () => {
  const { inputs, outputs } = useMidiStore();
  return { inputs, outputs };
};

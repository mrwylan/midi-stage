import { create } from 'zustand';

export interface MidiDevice {
  id: string;
  name: string;
  manufacturer: string;
}

interface MidiState {
  inputs: MidiDevice[];
  outputs: MidiDevice[];
  setInputs: (inputs: MidiDevice[]) => void;
  setOutputs: (outputs: MidiDevice[]) => void;
}

export const useMidiStore = create<MidiState>((set) => ({
  inputs: [],
  outputs: [],
  setInputs: (inputs) => set({ inputs }),
  setOutputs: (outputs) => set({ outputs }),
}));
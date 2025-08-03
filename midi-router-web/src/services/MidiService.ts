import { useMidiStore } from '../state/midiStore';
import type { MidiDevice } from '../state/midiStore';

class MidiService {
  private static instance: MidiService;

  private constructor() {}

  public static getInstance(): MidiService {
    if (!MidiService.instance) {
      MidiService.instance = new MidiService();
    }
    return MidiService.instance;
  }

  public async initialize(): Promise<void> {
    if (!navigator.requestMIDIAccess) {
      console.error('Web MIDI API is not supported in this browser.');
      return;
    }

    try {
      const midiAccess = await navigator.requestMIDIAccess();
      this.updateDevices(midiAccess);
      midiAccess.onstatechange = (e) => this.updateDevices(e.currentTarget as MIDIAccess);
    } catch (error) {
      console.error('Could not access MIDI devices.', error);
    }
  }

  private updateDevices(midiAccess: MIDIAccess) {
    const inputs: MidiDevice[] = [];
    midiAccess.inputs.forEach((input) => {
      inputs.push({
        id: input.id,
        name: input.name ?? 'Unknown Input',
        manufacturer: input.manufacturer ?? 'Unknown Manufacturer',
      });
    });
    useMidiStore.getState().setInputs(inputs);

    const outputs: MidiDevice[] = [];
    midiAccess.outputs.forEach((output) => {
      outputs.push({
        id: output.id,
        name: output.name ?? 'Unknown Output',
        manufacturer: output.manufacturer ?? 'Unknown Manufacturer',
      });
    });
    useMidiStore.getState().setOutputs(outputs);
  }
}

export const midiService = MidiService.getInstance();

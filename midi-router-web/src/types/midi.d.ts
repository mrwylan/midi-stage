// Web MIDI API types
declare global {
  interface Navigator {
    requestMIDIAccess(options?: MIDIOptions): Promise<MIDIAccess>;
  }

  interface MIDIOptions {
    sysex?: boolean;
    software?: boolean;
  }

  interface MIDIAccess extends EventTarget {
    readonly inputs: MIDIInputMap;
    readonly outputs: MIDIOutputMap;
    readonly sysexEnabled: boolean;
    onstatechange: ((event: MIDIConnectionEvent) => void) | null;
  }

  type MIDIInputMap = ReadonlyMap<string, MIDIInput>;
  type MIDIOutputMap = ReadonlyMap<string, MIDIOutput>;

  interface MIDIPort extends EventTarget {
    readonly id: string;
    readonly manufacturer?: string;
    readonly name?: string;
    readonly type: MIDIPortType;
    readonly version?: string;
    readonly state: MIDIPortDeviceState;
    readonly connection: MIDIPortConnectionState;
    onstatechange: ((event: MIDIConnectionEvent) => void) | null;
    open(): Promise<MIDIPort>;
    close(): Promise<MIDIPort>;
  }

  interface MIDIInput extends MIDIPort {
    onmidimessage: ((event: MIDIMessageEvent) => void) | null;
  }

  interface MIDIOutput extends MIDIPort {
    send(data: Uint8Array | ArrayLike<number>, timestamp?: number): void;
    clear(): void;
  }

  interface MIDIMessageEvent extends Event {
    readonly data: Uint8Array;
    readonly receivedTime: number;
  }

  interface MIDIConnectionEvent extends Event {
    readonly port: MIDIPort;
  }

  type MIDIPortType = "input" | "output";
  type MIDIPortDeviceState = "disconnected" | "connected";
  type MIDIPortConnectionState = "open" | "closed" | "pending";
}

export {};
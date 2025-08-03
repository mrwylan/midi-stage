import { create } from 'zustand';
import type { MidiMessage, MidiConnection } from '../types';

interface MidiState {
  messages: MidiMessage[];
  connections: MidiConnection[];
  isMonitoring: boolean;
  maxMessages: number;
  addMessage: (message: MidiMessage) => void;
  clearMessages: () => void;
  setMonitoring: (monitoring: boolean) => void;
  addConnection: (connection: Omit<MidiConnection, 'id'>) => void;
  updateConnection: (id: string, updates: Partial<MidiConnection>) => void;
  removeConnection: (id: string) => void;
  setConnections: (connections: MidiConnection[]) => void;
}

export const useMidiStore = create<MidiState>((set) => ({
  messages: [],
  connections: [],
  isMonitoring: true,
  maxMessages: 1000,

  addMessage: (message) =>
    set((state) => {
      if (!state.isMonitoring) return state;
      
      const newMessages = [message, ...state.messages];
      return {
        messages: newMessages.slice(0, state.maxMessages),
      };
    }),

  clearMessages: () => set({ messages: [] }),

  setMonitoring: (monitoring) => set({ isMonitoring: monitoring }),

  addConnection: (connectionData) =>
    set((state) => ({
      connections: [
        ...state.connections,
        {
          ...connectionData,
          id: `connection-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        },
      ],
    })),

  updateConnection: (id, updates) =>
    set((state) => ({
      connections: state.connections.map((connection) =>
        connection.id === id ? { ...connection, ...updates } : connection
      ),
    })),

  removeConnection: (id) =>
    set((state) => ({
      connections: state.connections.filter((connection) => connection.id !== id),
    })),

  setConnections: (connections) => set({ connections }),
}));
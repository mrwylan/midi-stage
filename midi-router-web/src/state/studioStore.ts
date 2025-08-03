import { create } from 'zustand';
import { type Edge, type Node, applyNodeChanges, applyEdgeChanges, type OnNodesChange, type OnEdgesChange } from 'reactflow';

interface StudioState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addNode: (node: Node) => void;
}

export const useStudioStore = create<StudioState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
}));
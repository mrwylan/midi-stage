// src/hooks/useStudio.ts
import { useStudioStore } from '../state/studioStore';

export const useStudio = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStudioStore();

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  };
};

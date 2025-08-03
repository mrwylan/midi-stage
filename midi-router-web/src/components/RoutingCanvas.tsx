import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { useStudioStore } from '../state/studioStore';

export const RoutingCanvas: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange } = useStudioStore();

  return (
    <div style={{ height: '500px', border: '1px solid black' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

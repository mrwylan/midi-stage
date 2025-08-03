import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import type { Node, Edge, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import { Box } from '@mui/material';
import { useDeviceStore } from '../state/deviceStore';
import { useMidiStore } from '../state/midiStore';

const nodeTypes = {
  // We'll use default nodes for now
};

export const RoutingCanvas: React.FC = () => {
  const connectedDevices = useDeviceStore((state) => state.connectedDevices);
  const { connections, addConnection } = useMidiStore();

  // Convert devices to React Flow nodes
  const initialNodes: Node[] = useMemo(() => {
    return connectedDevices.map((device, index) => ({
      id: device.id,
      type: 'default',
      position: { x: 100 + (index % 3) * 250, y: 100 + Math.floor(index / 3) * 150 },
      data: {
        label: (
          <Box sx={{ textAlign: 'center', p: 1 }}>
            <Box sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
              {device.customName || device.name}
            </Box>
            <Box sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
              {device.type}
            </Box>
          </Box>
        ),
      },
      style: {
        background: device.color || '#6366f1',
        color: 'white',
        border: '2px solid #334155',
        borderRadius: 8,
        width: 200,
      },
    }));
  }, [connectedDevices]);

  // Convert connections to React Flow edges
  const initialEdges: Edge[] = useMemo(() => {
    return connections.map((connection) => ({
      id: connection.id,
      source: connection.sourceId,
      target: connection.targetId,
      type: 'smoothstep',
      style: { stroke: '#6366f1', strokeWidth: 2 },
      animated: true,
    }));
  }, [connections]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when devices change
  React.useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // Update edges when connections change
  React.useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target) {
        // Add to our state management
        addConnection({
          sourceId: params.source,
          targetId: params.target,
          filters: [],
          mappings: [],
        });

        // Add to React Flow
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [addConnection, setEdges]
  );

  return (
    <Box sx={{ height: '500px', width: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ background: '#0f0f23' }}
      >
        <Controls />
        <MiniMap
          style={{
            background: '#1a1a2e',
            border: '1px solid #334155',
          }}
          nodeStrokeColor="#6366f1"
          nodeColor="#16213e"
          nodeBorderRadius={4}
        />
        <Background color="#334155" gap={20} />
      </ReactFlow>
    </Box>
  );
};
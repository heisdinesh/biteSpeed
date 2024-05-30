// src/components/ChatbotFlow.js
import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import SaveButton from "./SaveButton";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Welcome to Chatbot" },
    position: { x: 250, y: 5 },
  },
];

const ChatbotFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };
    const newNode = {
      id: new Date().getTime().toString(),
      type,
      position,
      data: { label: "Send Message" },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  return (
    <div className="chatbot-flow">
      <NodesPanel onDragStart={onDragStart} />
      <div
        className="flow-wrapper"
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedNode ? (
        <SettingsPanel node={selectedNode} setNodes={setNodes} />
      ) : (
        <div className="settings-placeholder">
          Select a node to edit its settings
        </div>
      )}
      <SaveButton nodes={nodes} edges={edges} />
    </div>
  );
};

export default ChatbotFlow;

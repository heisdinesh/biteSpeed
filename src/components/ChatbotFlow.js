import React, { useState, useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import SettingsPanel from "./SettingsPanel";
import "./ChatbotFlow.css";
import { Toaster, toast } from "react-hot-toast";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Welcome to BiteSpeed" },
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
      data: { label: "Click and type message" },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setSelectedNode(null);
  };

  const nodeStyles = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      style:
        node.id === selectedNode?.id
          ? { backgroundColor: "lightblue", border: "2px solid blue" }
          : {},
    }));
  }, [nodes, selectedNode]);

  const handlePaneClick = () => {
    setSelectedNode(null);
  };

  const validateNodes = () => {
    const invalidNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );
    if (invalidNodes.length > 1) {
      toast.error("Some nodes have empty target handles");
    } else {
      toast.success("Flow saved successfully");
    }
  };

  return (
    <div className="chatbot-flow">
      <header className="header">
        <h1>BiteSpeed Chatbot Flow</h1>
      </header>
      <div className="main-content">
        <div
          className="flow-wrapper"
          onDrop={onDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          <ReactFlow
            nodes={nodeStyles}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={handlePaneClick}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <SettingsPanel
          node={selectedNode}
          setNodes={setNodes}
          onDragStart={onDragStart}
          onDelete={handleDeleteNode}
          setSelectedNode={setSelectedNode}
          onSaveFlow={validateNodes}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default ChatbotFlow;

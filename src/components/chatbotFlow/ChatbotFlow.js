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
import styles from "../../styles/components/chatbotFlow/ChatbotFlow.module.scss";
import { toast } from "react-hot-toast";

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

  //  Function to drag a new message from settings panel to react flow.
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Function to create a new node when dropped from the settings panel.
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

  // Function to identify the selected node to either edit the message or delete it.
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Function to delete the node (message) from the react flow.
  const handleDeleteNode = (nodeId) => {
    setNodes((nds) => nds.filter((n) => n.id !== nodeId));
    setSelectedNode(null);
  };

  // Special styling to identify which node is selected.
  const nodeStyles = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      style:
        node.id === selectedNode?.id
          ? { backgroundColor: "lightblue", border: "2px solid blue" }
          : {},
    }));
  }, [nodes, selectedNode]);

  // Function to deselect the node when clicked elsewhere apart from node.
  const handlePaneClick = () => {
    setSelectedNode(null);
  };

  // Function to check whether all the target handles are connected.
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
    <div className={styles.chatbotFlow}>
      <header className={styles.header}>
        <h1>BiteSpeed Chatbot Flow</h1>
      </header>
      <div className={styles.mainContent}>
        <div
          className={styles.flowWrapper}
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
    </div>
  );
};

export default ChatbotFlow;

// src/components/SettingsPanel.js
import React from "react";

const SettingsPanel = ({ node, setNodes }) => {
  const onChange = (event) => {
    const updatedNode = {
      ...node,
      data: { ...node.data, label: event.target.value },
    };
    setNodes((nds) => nds.map((n) => (n.id === node.id ? updatedNode : n)));
  };

  return (
    <aside className="settings-panel">
      <div className="description">Edit the node text</div>
      <input type="text" value={node.data.label} onChange={onChange} />
    </aside>
  );
};

export default SettingsPanel;

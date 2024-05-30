// src/components/NodesPanel.js
import React from "react";

const NodesPanel = ({ onDragStart }) => {
  return (
    <aside className="nodes-panel">
      <div className="description">Drag a node to the pane on the right.</div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Send Message
      </div>
    </aside>
  );
};

export default NodesPanel;

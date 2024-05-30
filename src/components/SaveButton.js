// src/components/SaveButton.js
import React from "react";

const SaveButton = ({ nodes, edges }) => {
  const onSave = () => {
    const emptyTargets = nodes.filter(
      (node) => !edges.find((edge) => edge.source === node.id)
    );

    if (emptyTargets.length > 1) {
      alert("Error: More than one node has empty target handles.");
      return;
    }

    console.log("Nodes:", nodes);
    console.log("Edges:", edges);
  };

  return (
    <button onClick={onSave} className="save-button">
      Save Changes
    </button>
  );
};

export default SaveButton;

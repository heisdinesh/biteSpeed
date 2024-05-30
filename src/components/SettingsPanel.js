import React, { useEffect, useState } from "react";
import "./SettingsPanel.css";
import toast from "react-hot-toast";

const SettingsPanel = ({
  node,
  setNodes,
  onDragStart,
  onDelete,
  setSelectedNode,
  onSaveFlow, // Add onSaveFlow prop
}) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (node) {
      setText(node.data.label);
    }
  }, [node]);

  const onChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  const handleSubmit = () => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, label: text } } : n
      )
    );
    setSelectedNode(null);
    toast.success("Message updated successfully");
  };

  const handleDelete = () => {
    onDelete(node.id);
    setSelectedNode(null);
    toast.success("Message deleted successfully");
  };

  const handleMessageClick = () => {
    toast.error("Please drag the message box into the plane.");
  };

  const handleSaveFlow = () => {
    onSaveFlow();
  };

  return (
    <aside className="settings-panel">
      <div className="description">Drag a node to the pane on the left.</div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        onClick={handleMessageClick}
        draggable
      >
        New Message
      </div>
      {node && (
        <>
          <div className="description">Edit the node text</div>
          <input type="text" value={text} onChange={onChange} />
          <button type="button" onClick={handleSubmit} className="save-button">
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Node
          </button>
        </>
      )}
      <button
        type="button"
        onClick={handleSaveFlow}
        className="save-flow-button"
      >
        Save Flow
      </button>
    </aside>
  );
};

export default SettingsPanel;

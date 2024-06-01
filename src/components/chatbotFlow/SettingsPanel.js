import React, { useEffect, useState } from "react";
import styles from "../../styles/components/chatbotFlow/SettingsPannel.module.scss";
import toast from "react-hot-toast";

const SettingsPanel = ({
  node,
  setNodes,
  onDragStart,
  onDelete,
  setSelectedNode,
  onSaveFlow,
}) => {
  const [text, setText] = useState("");

  // Use effect to set the  text in input field, to edit the message.
  useEffect(() => {
    if (node) {
      setText(node.data.label);
    }
  }, [node]);

  const onChange = (event) => {
    const { value } = event.target;
    setText(value);
  };

  // Function to save the message after edit
  const handleSaveMessage = () => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, label: text } } : n
      )
    );
    setSelectedNode(null);
    toast.success("Message updated successfully");
  };

  // Function to delete the message.
  const handleDeleteMessage = () => {
    onDelete(node.id);
    setSelectedNode(null);
    toast.success("Message deleted successfully");
  };

  // Function to guide users how to create a new node (message).
  const handleMessageClick = () => {
    toast.error("Please drag the message box into the plane.");
  };

  const handleSaveFlow = () => {
    onSaveFlow();
  };

  return (
    <aside className={styles.settingsPanel}>
      <div className={styles.description}>
        Drag a node to the pane on the left.
      </div>
      <div
        className={styles.dndNode}
        onDragStart={(event) => onDragStart(event, "default")}
        onClick={handleMessageClick}
        draggable
      >
        New Message
      </div>
      {node && (
        <>
          <div className={styles.description}>Edit the node text</div>
          <input type="text" value={text} onChange={onChange} />
          <div className={styles.buttonContainer}>
            <button
              type="button"
              onClick={handleSaveMessage}
              className={styles.saveButton}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDeleteMessage}
              className={styles.deleteButton}
            >
              Delete Node
            </button>
          </div>
        </>
      )}
      <button
        type="button"
        onClick={handleSaveFlow}
        className={styles.saveFlowButton}
      >
        Save Flow
      </button>
    </aside>
  );
};

export default SettingsPanel;

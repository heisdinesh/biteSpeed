import React from "react";
import { ChatbotFlow } from "../../components";
import styles from "../../styles/pages/Home.module.scss";
import { Toaster } from "react-hot-toast";

function Home() {
  return (
    <div className={styles.container}>
      <ChatbotFlow />
      <Toaster />
    </div>
  );
}

export default Home;

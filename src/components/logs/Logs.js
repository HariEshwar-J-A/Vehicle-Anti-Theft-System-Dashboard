import React from "react";

import styles from "./Logs.module.scss";

const Logs = ({ messages }) => {
  return (
    <div className={styles.pageStyles}>
      <div className={styles.chatStyles}>
        <div className={styles.headerStyles}>Last 100 Logs</div>
        <div className={styles.listStyles}>
          {messages.map((message, index) => {
            return (
              <div key={`message-${index}`} className={styles.messageStyles}>
                {message}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Logs;

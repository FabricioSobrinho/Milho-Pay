// import hooks
import { useEffect, useState } from "react";

// import styles
import styles from "../styles/Message.module.css";

function Message({ content, messageType }) {
  const time = 3000;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!content) {
      setVisible(false);
      return;
    }

    setVisible(true);
    if (time) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, time);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [content, time]);
  return (
    <>
      {visible && <div className={`${styles.Message} ${styles[messageType]}`}>{content}</div>}
    </>
  );
}

export default Message;

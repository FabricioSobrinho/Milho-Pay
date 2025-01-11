import styles from "../styles/Message.module.css";

function Message({ messageType, content }) {
  return (
    <div className={`${styles.Message} ${styles[messageType]}`}>{content}</div>
  );
}

export default Message;

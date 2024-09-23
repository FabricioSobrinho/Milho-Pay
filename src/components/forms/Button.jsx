import styles from "../../styles/ButtonStyles.module.css";

// eslint-disable-next-line react/prop-types
function Button({ text, handleClick, type }) {
  return (
    <div className={styles.button}>
      <button onClick={handleClick} className={`${styles.button} ${styles[type]} `}>
        {text}
      </button>
    </div>
  );
}

export default Button;

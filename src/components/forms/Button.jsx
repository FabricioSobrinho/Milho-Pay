import styles from "../../styles/ButtonStyles.module.css";

// eslint-disable-next-line react/prop-types
function Button({ text, handleClick, color }) {
  return (
    <div className={styles.button}>
      {/* Aplica dinamicamente a classe de cor passada pelas props */}
      <button onClick={handleClick} className={`${styles.button} ${styles[color]}`}>
        {text}
      </button>
    </div>
  );
}

export default Button;

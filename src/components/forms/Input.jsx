import styles from "../../styles/InputStyles.module.css";

// eslint-disable-next-line react/prop-types
function Input({ placeholder, handleChange, type}) {
  return (
    <div className={styles.input}>
      <input placeholder={placeholder} onChange={handleChange} type={type}/>
    </div>
  );
}

export default Input;

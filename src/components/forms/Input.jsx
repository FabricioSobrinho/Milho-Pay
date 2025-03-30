import styles from "../../styles/InputStyles.module.css";

// eslint-disable-next-line react/prop-types
function Input({ placeholder, handleChange, type, name, value }) {
  return (
    <div className={styles.input}>
      <input
        placeholder={placeholder}
        onChange={handleChange}
        type={type}
        name={name}
        value={value}
      />
    </div>
  );
}

export default Input;

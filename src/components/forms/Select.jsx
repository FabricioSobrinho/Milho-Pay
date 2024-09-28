import styles from "../../styles/Select.module.css";

// eslint-disable-next-line react/prop-types
function Select({ text, options }) {
  return (
    <div className={styles.select}>
      <select defaultValue="">
        <option value="" disabled>
          {text}
        </option>

        {options &&
          options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Select;

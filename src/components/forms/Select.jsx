import styles from "../../styles/Select.module.css";

// eslint-disable-next-line react/prop-types
function Select({ text, options, handleSelect, name }) {
  return (
    <div className={styles.select}>
      <select defaultValue="" onChange={handleSelect} name={name}>
        <option value="" disabled>
          {text}
        </option>

        {options &&
          options.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Select;

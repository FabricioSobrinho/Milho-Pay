import styles from "../styles/QuantityPicker.module.css"
import { useState, useEffect } from "react";

function QuantityPicker({ value = 0, onChange }) {
  const [quantity, setQuantity] = useState(value);

  useEffect(() => {
    setQuantity(value); 
  }, [value]);

  const add = () => {
    const newVal = quantity + 1;
    setQuantity(newVal);
    onChange(newVal); 
  };

  const subtract = () => {
    if (quantity === 0) return;
    const newVal = quantity - 1;
    setQuantity(newVal);
    onChange(newVal); 
  };

  return (
    <div className={styles.mainPicker}>
      <div onClick={subtract} className={styles.subtract}> - </div>
      <div>{quantity}</div>
      <div onClick={add} className={styles.add}> + </div>
    </div>
  );
}

export default QuantityPicker;

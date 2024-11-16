import styles from "../styles/MenuItem.module.css";

const MenuItem = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>Nenhum item disponível.</p>;
  }

  return (
    <div className={styles.mainItem}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item.name} <br/> R$ {item.value.toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default MenuItem;

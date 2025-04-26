import styles from "../styles/MenuItem.module.css";

const MenuItem = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>Nenhum item disponível.</p>;
  }

  const dishes = items.filter(item => item.dish);
  const drinks = items.filter(item => item.drink);

  return (
    <div className={styles.mainItem}>
      <section className={styles.section}>
        <h2>Pratos</h2>
        <div className={styles.grid}>
          {dishes.map((item, idx) => (
            <div key={idx} className={styles.item}>
              {item.name}
              <br /> R$ {item.value.toFixed(2)}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Bebidas</h2>
        <div className={styles.grid}>
          {drinks.map((item, idx) => (
            <div key={idx} className={styles.item}>
              {item.name}
              <br /> R$ {item.value.toFixed(2)}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuItem;

import styles from "../styles/InitialPanel.module.css";

import Button from "../components/forms/Button";

function InitialPanel() {
  return (
    <div className={styles.mainInitialPanel}>
      <h1>Bem vindos Barraca!</h1>
      <h3>O que vamos fazer?</h3>
      <div className={styles.form}>
        <Button text={"Cadastrar pratos"} type={"green"}/>
        <Button text={"Cadastrar bebidas"} type={"green"}/>
        <Button text={"Tela de vendas"} type={"green"}/>
      </div>
    </div>
  );
};

export default InitialPanel;

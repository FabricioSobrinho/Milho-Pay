import styles from "../styles/DrinkCadPage.module.css";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

function DrinkCadPage() {
  return (
    <div className={styles.mainMenuCad}>
      <h1>Cadastre suas bebidas!</h1>
      <div className={styles.cadForm}>
        <Input placeholder={"Nome do Bebida"} />
        <Input placeholder={"Custo do Bebida"} />
        <Input placeholder={"Valor de venda"} />
        <Button text={"Incluir Bebida"} type={"green"} />
      </div>
    </div>
  );
}

export default DrinkCadPage;

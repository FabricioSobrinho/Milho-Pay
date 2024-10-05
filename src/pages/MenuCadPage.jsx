import styles from "../styles/MenuCadPage.module.css";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

function MenuCadPage() {
  return (
    <div className={styles.mainMenuCad}>
      <h1>Cadastre seus pratos!</h1>
      <div className={styles.cadForm}>
        <Input placeholder={"Nome do Prato"} />
        <Input placeholder={"Custo do Prato"} />
        <Input placeholder={"Valor de venda"} />
        <Button text={"Incluir Prato"} type={"green"} />
      </div>
    </div>
  );
}

export default MenuCadPage;

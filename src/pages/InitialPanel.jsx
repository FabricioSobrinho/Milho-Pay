import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import styles from "../styles/InitialPanel.module.css";

import Button from "../components/forms/Button";

function InitialPanel() {
  const isLogged = Cookies.get("loginToken");

  const navigate = useNavigate();
  return (
    <div className={styles.mainInitialPanel}>
      {isLogged && (
        <>
          <h1>Bem vindos Barraca!</h1>
          <h3>O que vamos fazer?</h3>
          <div className={styles.form}>
            <Button text={"Cadastrar pratos"} type={"green"} handleClick={() => navigate("/menu")}/>
            <Button text={"Cadastrar bebidas"} type={"green"} handleClick={() => navigate("/drink")}/>
            <Button text={"Tela de vendas"} type={"green"} handleClick={() => navigate("/order")}/>
          </div>
        </>
      )}
    </div>
  );
}

export default InitialPanel;

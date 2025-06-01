import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import styles from "../styles/InitialPanel.module.css";

import Button from "../components/forms/Button";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";

function InitialPanel() {
  const isLogged = Cookies.get("loginToken");
  const tentName = Cookies.get("loggedTent");

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("loginToken");
    setLoading(false);
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.mainInitialPanel}>
          {isLogged && (
            <>
              <h1>Bem vindos {tentName}!</h1>
              <h3>O que vamos fazer?</h3>
              <div className={styles.form}>
                <Button
                  text={"Cadastrar pratos"}
                  type={"green"}
                  handleClick={() => navigate("/menu")}
                />
                <Button
                  text={"Cadastrar bebidas"}
                  type={"green"}
                  handleClick={() => navigate("/drink")}
                />
                <Button
                  text={"Edição de cardápio"}
                  type={"green"}
                  handleClick={() => navigate("/edit")}
                />
                <Button
                  text={"Tela de vendas"}
                  type={"green"}
                  handleClick={() => navigate("/order")}
                />
                <Button
                  text={"Relatórios"}
                  type={"green"}
                  handleClick={() => navigate("/report")}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default InitialPanel;

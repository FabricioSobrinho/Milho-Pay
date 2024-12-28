import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import styles from "../styles/InitialPanel.module.css";

import Button from "../components/forms/Button";
import axios from "axios";

import { useBaseUrl } from "../hooks/useBaseUrl";
import { useEffect, useState } from "react";
import loadingImage from "../assets/images/loading.svg";
import Loader from "../components/Loader";

function InitialPanel() {
  const isLogged = Cookies.get("loginToken");
  const tentName = Cookies.get("loggedTent");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750); 
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
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
                  text={"Tela de vendas"}
                  type={"green"}
                  handleClick={() => navigate("/order")}
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

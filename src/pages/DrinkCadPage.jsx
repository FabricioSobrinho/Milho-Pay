import { useEffect, useState } from "react";
import { useBaseUrl } from "../hooks/useBaseUrl";
import axios from "axios";

import styles from "../styles/DrinkCadPage.module.css";
import drinkImage from "../assets/images/bebida.svg";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

import Message from "../components/Message";

function DrinkCadPage() {
  const [drinkData, setDrinkData] = useState({
    name: "",
    value: "",
    drinkCost: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { baseUrl, authToken } = useBaseUrl();

  const handleDrinkData = (e) => {
    if (e.target.type == "number") {
      setDrinkData({ ...drinkData, [e.target.name]: Number(e.target.value) });
    } else {
      setDrinkData({ ...drinkData, [e.target.name]: e.target.value });
    }
  };

  const insertDrink = async () => {
    try {
      await axios.post(`${baseUrl}/drinks`, drinkData, authToken);

      setDrinkData({
        name: "",
        value: "",
        drinkCost: "",
      });

      setSuccess("Bebida inserida com sucesso");
      // window.location.reload();
      setInterval(() => {
        setSuccess(null);
      }, 2000);

      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setError("Falha ao inserir bebida");
      window.location.reload();
    }
  };

  return (
    <div className={styles.mainDrinkCad}>
      <div className={styles.leftDrinkCad}>
        <img src={drinkImage} alt="copo de chopp" />
      </div>
      <div className={styles.rightDrinkCad}>
        <h1>Cadastre suas bebidas!</h1>
        {success && <Message content={success} messageType={"success"} />}
        {error && <Message content={error} messageType={"error"} />}
        <div className={styles.cadForm}>
          <Input
            placeholder={"Nome do Bebida"}
            name={"name"}
            handleChange={handleDrinkData}
            value={drinkData.name}
          />
          <Input
            placeholder={"Custo do Bebida"}
            name={"drinkCost"}
            type={"number"}
            handleChange={handleDrinkData}
            value={drinkData.drinkCost}
          />
          <Input
            placeholder={"Valor de venda"}
            name={"value"}
            type={"number"}
            handleChange={handleDrinkData}
            value={drinkData.value}
          />
          <Button
            text={"Incluir Bebida"}
            type={"green"}
            handleClick={insertDrink}
          />
        </div>
      </div>
    </div>
  );
}

export default DrinkCadPage;

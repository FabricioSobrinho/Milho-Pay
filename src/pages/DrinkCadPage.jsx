import { useState } from "react";
import { useBaseUrl } from "../hooks/useBaseUrl";
import axios from "axios";

import styles from "../styles/DrinkCadPage.module.css";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

function DrinkCadPage() {
  const [drinkData, setDrinkData] = useState({
    name: "",
    value: 0,
    drinkCost: 0,
  });

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
      const response = await axios.post(
        `${baseUrl}/drinks`,
        drinkData,
        authToken
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.mainMenuCad}>
      <h1>Cadastre suas bebidas!</h1>
      <div className={styles.cadForm}>
        <Input
          placeholder={"Nome do Bebida"}
          name={"name"}
          handleChange={handleDrinkData}
        />
        <Input
          placeholder={"Custo do Bebida"}
          name={"drinkCost"}
          type={"number"}
          handleChange={handleDrinkData}
        />
        <Input
          placeholder={"Valor de venda"}
          name={"value"}
          type={"number"}
          handleChange={handleDrinkData}
        />
        <Button
          text={"Incluir Bebida"}
          type={"green"}
          handleClick={insertDrink}
        />
      </div>
    </div>
  );
}

export default DrinkCadPage;

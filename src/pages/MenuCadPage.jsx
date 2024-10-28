import { useState } from "react";
import { useBaseUrl } from "../hooks/useBaseUrl";
import axios from "axios";

import styles from "../styles/MenuCadPage.module.css";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";

function MenuCadPage() {
  const { baseUrl, authToken } = useBaseUrl();
  const [menuData, setMenuData] = useState({
    name: "",
    value: 0,
    dishCost: 0,
  });

  const handleMenuData = (e) => {
    if (e.target.type == "number") {
      setMenuData({ ...menuData, [e.target.name]: Number(e.target.value) });
    } else {
      setMenuData({ ...menuData, [e.target.name]: e.target.value });
    }

    console.log(menuData);
    
  };

  const insertMenu = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/dishs`,
        menuData,
        authToken
      );

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.mainMenuCad}>
      <h1>Cadastre seus pratos!</h1>
      <div className={styles.cadForm}>
        <Input
          placeholder={"Nome do Prato"}
          name={"name"}
          handleChange={handleMenuData}
        />
        <Input
          placeholder={"Custo do Prato"}
          name={"dishCost"}
          type={"number"}
          handleChange={handleMenuData}
        />
        <Input
          placeholder={"Valor de venda"}
          name={"value"}
          type={"number"}
          handleChange={handleMenuData}
        />
        <Button
          text={"Incluir Prato"}
          type={"green"}
          handleClick={insertMenu}
        />
      </div>
    </div>
  );
}

export default MenuCadPage;

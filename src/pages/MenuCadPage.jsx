import { useState } from "react";
import { useBaseUrl } from "../hooks/useBaseUrl";
import axios from "axios";

import styles from "../styles/MenuCadPage.module.css";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import hamburgerImage from "../assets/images/Hamburger.svg";

import Message from "../components/Message";

function MenuCadPage() {
  const { baseUrl, authToken } = useBaseUrl();
  const [menuData, setMenuData] = useState({
    name: "",
    value: "",
    dishCost: "",
  });

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

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

      setMenuData({
        name: "",
        value: "",
        dishCost: "",
      });

      setSuccess("Prato inserido com sucesso");

      setInterval(() => {
        setSuccess(null);
      }, 2000);
      
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      setError("Erro ao inserir o prato");
      window.location.reload();
    }
  };

  return (
    <div className={styles.mainMenuCad}>
      <div className={styles.leftMenuCad}>
        <img src={hamburgerImage} alt="Hamburger" />
      </div>
      <div className={styles.rightMenuCad}>
        <h1>Cadastre seus pratos!</h1>
        {success && <Message content={success} messageType={"success"} />}
        {error && <Message content={error} messageType={"error"} />}
        <div className={styles.cadForm}>
          <Input
            placeholder={"Nome do Prato"}
            name={"name"}
            handleChange={handleMenuData}
            value={menuData.name}
          />
          <Input
            placeholder={"Custo do Prato"}
            name={"dishCost"}
            type={"number"}
            handleChange={handleMenuData}
            value={menuData.dishCost}
          />
          <Input
            placeholder={"Valor de venda"}
            name={"value"}
            type={"number"}
            handleChange={handleMenuData}
            value={menuData.value}
          />
          <Button
            text={"Incluir Prato"}
            type={"green"}
            handleClick={insertMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuCadPage;

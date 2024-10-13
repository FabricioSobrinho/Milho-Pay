import { useState } from "react";
import axios from "axios";
import { useBaseUrl } from "../hooks/useBaseUrl";
import { useNavigate } from "react-router-dom";

import styles from "../styles/InitialPageStyles.module.css";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

function InitialPage() {
  const navigate = useNavigate();

  const { baseUrl } = useBaseUrl();
  const [data, setData] = useState({
    name: null,
    password: "",
    passwordConfirmation: null,
  });

  const handleData = (e) => {
    console.log(data);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginNavigate = () => {
    navigate("/login");
  };

  const createTent = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(`${baseUrl}/tents`, data, config);

      if (response.status === 200) {
        navigate("/login", {
          state: {
            message: "Barraca criada com sucesso faça login!",
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.initialPage}>
      <div className={styles.leftInitialPage}>
        <h1>Bem vindo de Voltaa!</h1>
        <p>Faça login para se conectar</p>
        <Button text={"LOGIN"} handleClick={loginNavigate} />
      </div>
      <div className={styles.rigthInitialPage}>
        <h1>Novo por aqui?</h1>
        <h3>Crie sua conta!</h3>
        <div className={styles.form}>
          <Input
            placeholder={"Nome da barraca"}
            name={"name"}
            handleChange={handleData}
          />
          <Input
            placeholder={"Senha"}
            name={"password"}
            type={"password"}
            handleChange={handleData}
          />
          <Input
            placeholder={"Confirme sua senha"}
            name={"passwordConfirmation"}
            type={"password"}
            handleChange={handleData}
          />

          {data.password == data.passwordConfirmation && data.name && (
            <Button
              text={"CRIAR CONTA"}
              type="green"
              handleClick={createTent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default InitialPage;

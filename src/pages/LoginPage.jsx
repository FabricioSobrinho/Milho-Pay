import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBaseUrl } from "../hooks/useBaseUrl";
import Cookies from "js-cookie";

import styles from "../styles/LoginPageStyles.module.css";

import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

function LoginPage() {
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });

  const navigate = useNavigate();
  const { baseUrl, config } = useBaseUrl();

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const makeLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/login`, loginData, config);
      if (response.data.token) {
        Cookies.set("loginToken", response.data.token, { expires: 7 });
        console.log(Cookies.get("loginToken"));
        navigate("/tent")
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.mainLoginPage}>
        <h1>Bem vindo de volta!</h1>
        <div className={styles.loginForm}>
          <Input
            placeholder={"Nome da Barraca"}
            name={"name"}
            handleChange={handleLoginData}
          />
          <Input
            placeholder={"Senha"}
            type={"password"}
            name={"password"}
            handleChange={handleLoginData}
          />

          <Button type="login" text="LOGIN" handleClick={makeLogin} />
        </div>

        <div className={styles.loginFooter}>
          <p>É novo por aqui? Cadastre sua barraca!</p>

          <Button type="small" text={"NOVA BARRACA"} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

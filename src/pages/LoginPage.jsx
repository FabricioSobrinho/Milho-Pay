import styles from "../styles/LoginPageStyles.module.css";

import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.mainLoginPage}>
        <h1>Bem vindo de volta!</h1>
        <div className={styles.loginForm}>
          <Input placeholder={"Nome da Barraca"} />
          <Input placeholder={"Senha"} type={"password"} />

          <Button type="login" text="LOGIN" />
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

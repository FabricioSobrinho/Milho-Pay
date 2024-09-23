import styles from "../styles/InitialPageStyles.module.css";
import Button from "../components/forms/Button";
import Input from "../components/forms/Input";

function InitialPage() {
  return (
    <div className={styles.initialPage}>
      <div className={styles.leftInitialPage}>
        <h1>Bem vindo de Voltaa!</h1>
        <p>Faça login para se conectar</p>
        <Button text={"LOGIN"} handleClick={() => alert("Sanity test")} />
      </div>
      <div className={styles.rigthInitialPage}>
        <h1>Novo por aqui?</h1>
        <h3>Crie sua conta!</h3>
        <div className={styles.form}>
          <Input placeholder={"Nome da barraca"} />
          <Input placeholder={"Senha"} type={"password"} />
          <Input placeholder={"Confirme sua senha"} type={"password"} />

          <Button text={"CRIAR CONTA"} type="green" />
        </div>
      </div>
    </div>
  );
}

export default InitialPage;

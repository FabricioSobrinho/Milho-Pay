import styles from "../styles/OrderPage.module.css";

import Button from "../components/forms/Button";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";

import OrderItem from "../components/OrderItem";

function OrderPage() {

  const options = [
    {
      nome: "Crédito",
      id: 1
    },
    {
      nome: "Débito",
      id: 2
    },
    {
      nome: "Dinheiro",
      id: 3
    },
  ]
  return (
    <div className={styles.mainOrderPage}>
      <div className={styles.leftOrderPage}>
        <h2>Selecione seus itens:</h2>
        <div className={styles.form}>
          <Select text={"Selecione um prato"} />
          <Input placeholder={"Selecione a quantidade"} />
          <Button text={"Adicionar"} type={"login"} />

          <Select text={"Selecione uma bebida"} />
          <Input placeholder={"Selecione a quantidade"} />
          <Button text={"Adicionar"} type={"login"} />

          <Select text={"Método de pagamento"} options={options}/>
        </div>
        <div className={styles.orderResume}>
          <h2>Resumo do pedido</h2>
          <p>1 hamburguer</p>
          <p>1 coca-cola</p>
        </div>
      </div>
      <div className={styles.rightOrderPage}>
        <div className={styles.ticket}>
          <h4>Ticket</h4>

          <OrderItem
            item={{
              nome: "Hamburguer",
              valor: 10,
              quantidade: 1,
            }}
          />

          <OrderItem
            item={{
              nome: "Hamburguer",
              valor: 10,
              quantidade: 1,
            }}
          />

          <p>Total 20</p>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;

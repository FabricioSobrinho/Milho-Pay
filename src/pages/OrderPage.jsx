import axios from "axios";
import { useBaseUrl } from "../hooks/useBaseUrl";

import styles from "../styles/OrderPage.module.css";

import Button from "../components/forms/Button";
import Input from "../components/forms/Input";
import Select from "../components/forms/Select";

import OrderItem from "../components/OrderItem";
import { useEffect, useState } from "react";

function OrderPage() {
  const { baseUrl, authToken } = useBaseUrl();
  const [paymentMethodId, setPaymentMethodId] = useState(0);

  const [dishs, setDishs] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [totalValue, setTotalValue] = useState(0);

  const [ticket, setTicket] = useState({});

  const [menuDish, setMenuDish] = useState({ dishId: 0, quantity: 0 });
  const [menuDrink, setMenuDrink] = useState({ drinkId: 0, quantity: 0 });

  const [sendDish, setSendDish] = useState([]);
  const [sendDrink, setSendDrink] = useState([]);

  const options = [
    {
      name: "Crédito",
      id: 1,
    },
    {
      name: "Débito",
      id: 2,
    },
    {
      name: "Dinheiro",
      id: 3,
    },
    {
      name: "Pix",
      id: 4,
    },
  ];

  const handleDrinkMenu = (e) => {
    setMenuDrink({ ...menuDrink, [e.target.name]: Number(e.target.value) });
  };

  const handleDishMenu = (e) => {
    setMenuDish({ ...menuDish, [e.target.name]: Number(e.target.value) });
  };

  const loadDishs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/dishs`, authToken);

      setDishs((prev) => [...response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethodId(e.target.value);
  };

  const addDrink = () => {
    setSendDrink((prev) => [...prev, menuDrink]);

    const drink = drinks.filter((item) => item.drinkId == menuDrink.id);

    const value = drink[0].value * menuDrink.quantity;

    setTotalValue((prev) => prev + value);
  };

  const addDish = () => {
    setSendDish((prev) => [...prev, menuDish]);

    const dish = dishs.filter((item) => item.dishId == menuDish.id);
    const value = dish[0].value * menuDish.quantity;

    setTotalValue((prev) => prev + value);
  };

  const loadDrinks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/drinks`, authToken);

      setDrinks((prev) => [...response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  function genTicket(order) {
    const mappedDishes = order.dishes.map((dishOrder) => {
      const dish = dishs.find((d) => d.id === dishOrder.dishId);
      return {
        dishId: dishOrder.dishId,
        name: dish ? dish.name : "Prato não encontrado",
        quantity: dishOrder.quantity,
        price: dish ? dish.value : 0,
      };
    });

    const mappedDrinks = order.drinks.map((drinkOrder) => {
      const drink = drinks.find((d) => d.id === drinkOrder.drinkId);
      return {
        drinkId: drinkOrder.drinkId,
        name: drink ? drink.name : "Bebida não encontrada",
        quantity: drinkOrder.quantity,
        price: drink ? drink.value : 0,
      };
    });

    return {
      dishs: mappedDishes,
      drinks: mappedDrinks,
    };
  }

  const makeSell = async () => {
    try {
      const sellData = {
        value: totalValue,
        paymentMethodId: Number(paymentMethodId),
        dishes: sendDish,
        drinks: sendDrink,
      };

      const response = await axios.post(
        `${baseUrl}/sells`,
        sellData,
        authToken
      );
      const tick = genTicket(sellData);
      console.log(tick);

      setTicket((prev) => tick);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadDishs();
    loadDrinks();
  }, []);

  return (
    <div className={styles.mainOrderPage}>
      <div className={styles.leftOrderPage}>
        <h2>Selecione seus itens:</h2>
        <div className={styles.form}>
          {drinks && dishs && (
            <>
              <Select
                text={"Selecione um prato"}
                options={dishs}
                handleSelect={handleDishMenu}
                name={"dishId"}
              />
              <Input
                placeholder={"Selecione a quantidade"}
                name={"quantity"}
                handleChange={handleDishMenu}
              />
              <Button text={"Adicionar"} type={"login"} handleClick={addDish} />

              <Select
                text={"Selecione uma bebida"}
                options={drinks}
                handleSelect={handleDrinkMenu}
                name={"drinkId"}
              />
              <Input
                placeholder={"Selecione a quantidade"}
                name={"quantity"}
                handleChange={handleDrinkMenu}
                type={"number"}
              />
              <Button
                text={"Adicionar"}
                type={"login"}
                handleClick={addDrink}
              />

              <Select
                text={"Método de pagamento"}
                options={options}
                handleSelect={handlePaymentMethod}
              />
              <Button
                text={"Finalizar venda"}
                type={"login"}
                handleClick={makeSell}
              />
            </>
          )}
        </div>
        <div className={styles.orderResume}>
          <h2>Resumo do pedido</h2>
          {dishs
            .filter((item) => sendDish.some((dish) => dish.dishId === item.id))
            .map((filteredDish) => (
              <div key={filteredDish.id}>{filteredDish.name}</div>
            ))}
          {drinks
            .filter((item) =>
              sendDrink.some((dish) => dish.drinkId === item.id)
            )
            .map((filteredDrink) => (
              <div key={filteredDrink.id}>{filteredDrink.name}</div>
            ))}
        </div>
      </div>
      <div className={styles.rightOrderPage}>
        <div className={styles.ticket}>
          <h4>Ticket</h4>

          {ticket && <OrderItem order={ticket} />}

          <p>{totalValue}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;

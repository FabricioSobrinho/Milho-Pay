import axios from "axios";
import { useBaseUrl } from "../hooks/useBaseUrl";

import styles from "../styles/OrderPage.module.css";

import Button from "../components/forms/Button";
import Select from "../components/forms/Select";
import QuantityPicker from "../components/QuantityPicker";

import OrderItem from "../components/OrderItem";
import { useEffect, useState } from "react";

import Message from "../components/Message";

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

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

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

      // eslint-disable-next-line no-unused-vars
      setDishs((prev) => [...response.data]);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePaymentMethod = (e) => {
    setPaymentMethodId(e.target.value);
  };

  const toFixed = (value) => {
    return value + ".00";
  };

  const loadDrinks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/drinks`, authToken);

      // eslint-disable-next-line no-unused-vars
      setDrinks((prev) => [...response.data]);
    } catch (e) {
      console.log(e);
    }
  };
  const addDish = () => {
    setSendDish((prev) => {
      const updated = [...prev, menuDish];
      updateTotalValue(updated, sendDrink);
      return updated;
    });
  };

  const addDrink = () => {
    setSendDrink((prev) => {
      const updated = [...prev, menuDrink];
      updateTotalValue(sendDish, updated);
      return updated;
    });
  };

  const updateTotalValue = (
    newSendDish = sendDish,
    newSendDrink = sendDrink
  ) => {
    const totalDishValue = newSendDish.reduce((acc, dishOrder) => {
      const dish = dishs.find((d) => d.id === dishOrder.dishId);
      return acc + (dish ? dish.value * dishOrder.quantity : 0);
    }, 0);

    const totalDrinkValue = newSendDrink.reduce((acc, drinkOrder) => {
      const drink = drinks.find((d) => d.id === drinkOrder.drinkId);
      return acc + (drink ? drink.value * drinkOrder.quantity : 0);
    }, 0);

    setTotalValue(totalDishValue + totalDrinkValue);
  };

  function genTicket(order) {
    const mappedDishes = order.dishes.map((dishOrder) => {
      const dish = dishs.find((d) => d.id === dishOrder.dishId);
      return {
        dishId: dishOrder.dishId,
        name: dish ? dish.name : "Prato não encontrado",
        quantity: dishOrder.quantity,
        price: dish ? dish.value : 0,
        total: dish ? dish.value * dishOrder.quantity : 0,
      };
    });

    const mappedDrinks = order.drinks.map((drinkOrder) => {
      const drink = drinks.find((d) => d.id === drinkOrder.drinkId);
      return {
        drinkId: drinkOrder.drinkId,
        name: drink ? drink.name : "Bebida não encontrada",
        quantity: drinkOrder.quantity,
        price: drink ? drink.value : 0,
        total: drink ? drink.value * drinkOrder.quantity : 0,
      };
    });

    return {
      dishs: mappedDishes,
      drinks: mappedDrinks,
      totalValue:
        mappedDishes.reduce((acc, d) => acc + d.total, 0) +
        mappedDrinks.reduce((acc, d) => acc + d.total, 0),
    };
  }

  const makeSell = async () => {
    try {
      const totalDishValue = sendDish.reduce((acc, dishOrder) => {
        const dish = dishs.find((d) => d.id === dishOrder.dishId);
        return acc + (dish ? dish.value * dishOrder.quantity : 0);
      }, 0);

      const totalDrinkValue = sendDrink.reduce((acc, drinkOrder) => {
        const drink = drinks.find((d) => d.id === drinkOrder.drinkId);
        return acc + (drink ? drink.value * drinkOrder.quantity : 0);
      }, 0);

      const calculatedTotalValue = totalDishValue + totalDrinkValue;

      const sellData = {
        value: calculatedTotalValue,
        paymentMethodId: Number(paymentMethodId),
        dishes: sendDish,
        drinks: sendDrink,
      };

      if (sellData.dishes.length == 0 && sellData.drinks.length == 0) {
        setError("Insira ao menos um item no pedido");
        setInterval(() => {
          setError(null);
        }, 2000);
      } else if (sellData.paymentMethodId == 0) {
        setError("Insira o método de pagamento");

        setInterval(() => {
          setError(null);
        }, 2000);
      } else {
        await axios.post(`${baseUrl}/sells`, sellData, authToken);
        const tick = genTicket(sellData);

        setSuccess("Ordem gerada com sucesso");

        setInterval(() => {
          setSuccess(null);
        }, 2000);

        setTicket(tick);
      }
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

              <QuantityPicker
                value={menuDish.quantity}
                onChange={(value) =>
                  setMenuDish({ ...menuDish, quantity: value })
                }
              />

              <Button text={"Adicionar"} type={"login"} handleClick={addDish} />

              <Select
                text={"Selecione uma bebida"}
                options={drinks}
                handleSelect={handleDrinkMenu}
                name={"drinkId"}
              />
              <QuantityPicker
                value={menuDrink.quantity}
                onChange={(value) =>
                  setMenuDrink({ ...menuDrink, quantity: value })
                }
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
              <div className={styles.orderCart} key={filteredDish.id}>
                <p>{filteredDish.name}</p>
                <div
                  className={styles.remove}
                  onClick={() => {
                    const updatedDishes = sendDish.filter(
                      (dish) => dish.dishId !== filteredDish.id
                    );
                    setSendDish(updatedDishes);
                    updateTotalValue(updatedDishes, sendDrink);
                  }}
                >
                  X
                </div>
              </div>
            ))}
          {drinks
            .filter((item) =>
              sendDrink.some((dish) => dish.drinkId === item.id)
            )
            .map((filteredDrink) => (
              <div className={styles.orderCart} key={filteredDrink.id}>
                <p>{filteredDrink.name}</p>
                <div
                  className={styles.remove}
                  onClick={() => {
                    const updatedDrinks = sendDrink.filter(
                      (drink) => drink.drinkId !== filteredDrink.id
                    );
                    setSendDrink(updatedDrinks);
                    updateTotalValue(sendDish, updatedDrinks);
                  }}
                >
                  X
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className={styles.rightOrderPage}>
        <div className={styles.ticket}>
          <h4>Ticket</h4>

          {ticket && <OrderItem order={ticket} />}
          {success && <Message content={success} messageType={"success"} />}
          {error && <Message content={error} messageType={"error"} />}

          <p>Valor total: {toFixed(totalValue)} R$</p>
          <Button
            text={"Zerar Ordem"}
            type={"default"}
            handleClick={() => {
              window.location.reload();
            }}
          />
          <Button
            text={"Imprimir ordem"}
            type={"default"}
            handleClick={() => {
              window.alert("Enviado para a impressora");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderPage;

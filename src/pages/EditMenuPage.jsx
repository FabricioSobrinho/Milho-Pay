/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useBaseUrl } from "../hooks/useBaseUrl";

import styles from "../styles/EditMenuPage.module.css";

import Input from "../components/forms/Input";
import Button from "../components/forms/Button";
import Message from "../components/Message";


function EditMenuPage() {
  const { baseUrl, authToken } = useBaseUrl();

  const [dishs, setDishs] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  const loadMenu = async () => {
    try {
      const [dishRes, drinkRes] = await Promise.all([
        axios.get(`${baseUrl}/dishs`, authToken),
        axios.get(`${baseUrl}/drinks`, authToken),
      ]);

      const filteredDishs = dishRes.data.filter((dish) => dish.tentId);
      const filteredDrinks = drinkRes.data.filter((drink) => drink.tentId);

      setDishs(filteredDishs);
      setDrinks(filteredDrinks);
    } catch (e) {
      console.log(e);
    }
  };

  const updateItem = async (type, id, updatedData) => {
    const url = `${baseUrl}/${type === "dish" ? "dishs" : "drinks"}/${id}`;
    try {
      await axios.put(url, updatedData, authToken);
      await loadMenu();
      setSuccess("Atualizado com sucesso");
      setInterval(() => {
        setSuccess(null);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (type, id) => {
    const url = `${baseUrl}/${type === "dish" ? "dishs" : "drinks"}/${id}`;
    try {
      await axios.delete(url, authToken);
      await loadMenu();
      setSuccess("Deletado com sucesso");
      setInterval(() => {
        setSuccess(null);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div className={styles.container}>
      {success && <Message content={success} messageType={"success"} />}
      {error && <Message content={error} messageType={"error"} />}
      <h2>Gerenciar Pratos</h2>
      <div className={styles.section}>
        {dishs.map((dish) => (
          <EditableItem
            key={dish.id}
            item={dish}
            type="dish"
            onUpdate={updateItem}
            onDelete={deleteItem}
          />
        ))}
      </div>

      <h2>Gerenciar Bebidas</h2>
      <div className={styles.section}>
        {drinks.map((drink) => (
          <EditableItem
            key={drink.id}
            item={drink}
            type="drink"
            onUpdate={updateItem}
            onDelete={deleteItem}
          />
        ))}
      </div>
    </div>
  );
}

function EditableItem({ item, type, onUpdate, onDelete }) {
  const [editData, setEditData] = useState({
    name: item.name,
    value: item.value,
    dishCost: item.value,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === "value" ? Number(value) : value,
    });
  };

  return (
    <div className={styles.editableItem}>
      <Input
        name="name"
        value={editData.name}
        handleChange={handleInputChange}
      />
      <Input
        name="value"
        type="number"
        value={editData.value}
        handleChange={handleInputChange}
      />
      <Button
        text="Salvar"
        type={"green"}
        handleClick={() => onUpdate(type, item.id, editData)}
      />
      <Button
        type={"red"}
        text="Excluir"
        handleClick={() => onDelete(type, item.id)}
      />
    </div>
  );
}

export default EditMenuPage;

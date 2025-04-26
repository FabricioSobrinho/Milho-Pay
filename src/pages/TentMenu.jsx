import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../hooks/useBaseUrl";
import MenuItem from "../components/MenuItem";

function TentMenu() {
  const { tent } = useParams();
  const { baseUrl, config } = useBaseUrl();
  const [items, setItems] = useState([]);

  const getMenu = async () => {
    try {
      const response = await axios.get(`${baseUrl}/menu/${tent}`, config);

      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else if (typeof response.data === "object" && response.data !== null) {
        const dishes = response.data.dishs || [];
        const drinks = response.data.drinks || [];
        const combinedItems = [
          ...dishes.map(item => ({
            ...item,
            dish: true
          })),
          ...drinks.map(item => ({
            ...item,
            drink: true
          }))
        ];
        setItems(combinedItems);
      } else {
        console.error("Formato inesperado de dados:", response.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getMenu();
  }, [tent]);

  return (
    <>
      <MenuItem items={items} />
    </>
  );
}

export default TentMenu;

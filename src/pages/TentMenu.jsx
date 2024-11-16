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

      // Verifica se response.data é um array ou objeto
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else if (typeof response.data === "object" && response.data !== null) {
        // Se for um objeto, mapeie os valores ou adapte conforme necessário
        const combinedItems = [
          ...(response.data.dishs || []),
          ...(response.data.drinks || []),
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
    console.log(tent);
    getMenu();
  }, [tent]);

  return (
    <>
      <MenuItem items={items} />
    </>
  );
}

export default TentMenu;

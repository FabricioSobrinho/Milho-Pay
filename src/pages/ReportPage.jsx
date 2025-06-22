import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useBaseUrl } from "../hooks/useBaseUrl";
import styles from "../styles/ReportPage.module.css";

function ReportPage() {
  const { baseUrl, authToken } = useBaseUrl();

  const [allData, setAllData] = useState([]);
  const [todayData, setTodayData] = useState([]);

  const [menuDish, setMenuDish] = useState([]);
  const [menuDrink, setMenuDrink] = useState([]);

  const [selectedItemType, setSelectedItemType] = useState("dish");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    loadAllData();
    loadTodayData();
    loadMenuOptions();
  }, []);

  const loadAllData = async () => {
    const response = await axios.get(`${baseUrl}/sells-report/all`, authToken);
    setAllData(response.data);
  };

  const loadTodayData = async () => {
    const response = await axios.get(
      `${baseUrl}/sells-report/todaysofar`,
      authToken
    );
    setTodayData(response.data);
  };

  const loadMenuOptions = async () => {
    const dishRes = await axios.get(`${baseUrl}/dishs`, authToken);
    const drinkRes = await axios.get(`${baseUrl}/drinks`, authToken);
    setMenuDish((prev) => [...dishRes.data]);
    setMenuDrink((prev) => [...drinkRes.data]);

    console.log(menuDish);
  };

  const processFilteredData = () => {
    if (!selectedItemId || !allData.length) return;

    const map = new Map();

    allData.forEach((sell) => {
      const items =
        selectedItemType === "dish" ? sell.sellDishes : sell.sellDrinks;

      if (Array.isArray(items)) {
        items.forEach((item) => {
          if (
            (selectedItemType == "dish" && item.dishId == selectedItemId) ||
            (selectedItemType == "drink" && item.drinkId == selectedItemId)
          ) {
            const dateKey = formatDateTime(sell.createdAt);
            const prev = map.get(dateKey) || 0;
            map.set(dateKey, prev + item.quantity);
          }
        });
        console.log(sell.createdAt);
      }
    });
    const result = Array.from(map.entries()).map(([createdAt, value]) => ({
      createdAt,
      value,
    }));

    setFilteredData(result);
  };

  function formatDateTime(dateString) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Data inválida";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hour}:${minutes}`;
  }

  useEffect(() => {
    processFilteredData();
  }, [selectedItemId, selectedItemType, allData]);

  const renderLineChart = (data, title) => (
    <div className={styles.chartContainer}>
      <h3>{title}</h3>
      <ResponsiveContainer width={1000} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" tickFormatter={formatDateTime} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1900ff"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className={styles.mainReport}>
      {renderLineChart(allData, "Todas as Vendas")}
      <h3>Vendas por Item Selecionado</h3>
      {selectedItemId &&
        renderLineChart(filteredData)}
      {console.log(allData[0])}
      <div className={styles.filters}>
        <select
          value={selectedItemType}
          className={styles.select}
          onChange={(e) => {
            setSelectedItemType(e.target.value);
            setSelectedItemId(null);
          }}
        >
          <option value="dish">Prato</option>
          <option value="drink">Bebida</option>
        </select>

        <select
          value={selectedItemId || ""}
          className={styles.select}
          onChange={(e) =>
            setSelectedItemId(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Selecione um item</option>
          {(selectedItemType === "dish" ? menuDish : menuDrink).map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ReportPage;

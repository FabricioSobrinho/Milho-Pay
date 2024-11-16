import { useState } from "react";
import Cookies from "js-cookie";
export const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3000");

  const token = Cookies.get("loginToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const authToken = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return { baseUrl, setBaseUrl, config, authToken };
};

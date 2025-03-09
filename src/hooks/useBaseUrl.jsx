import { useState } from "react";
import Cookies from "js-cookie";
export const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState(import.meta.env.REACT_APP_API_BASEURL)

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

import { useState } from 'react';

export const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3000');
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return { baseUrl, setBaseUrl, config };
};


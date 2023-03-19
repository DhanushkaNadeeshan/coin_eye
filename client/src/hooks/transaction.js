import { useState, useEffect } from "react";
import axios from "axios";
const useTransactionAPI = (address) => {
  const [dataTX, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/transaction/ETH/${address}`);
        setData(response.data.result);
      } catch (error) {
        console.error(error.response.status);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dataTX, isLoading };
};

export default useTransactionAPI;

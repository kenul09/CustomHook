import { useState, useEffect } from "react";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
        if (!response.ok) throw new Error("Məlumat yüklənərkən xəta baş verdi");
        const json = await response.json();
        // Tapşırıqda ilk 5 element istənildiyi üçün slice edirik
        setData(json.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};
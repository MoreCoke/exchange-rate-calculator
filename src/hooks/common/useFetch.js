import React, { useState, useEffect } from 'react';

export default function useFetch(url, options) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();

        setResponse(json);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return { response, error };
}

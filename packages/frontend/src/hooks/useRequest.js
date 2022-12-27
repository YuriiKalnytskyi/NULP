import {useEffect, useState} from "react";

export const useRequest = (name, request, deps = [], setLoader) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(`Get Data ${name}`);
    setLoading(true);
    setLoader(true)
    setTimeout(() => {
      request()
        .then((response) => setData(response.data))
        .catch((error1) => setError(error1))
        .finally(() => {
          setLoading(false)
          setLoader(false)
        });
    }, 1000);
  }, deps ?? []);

  return { data, loading, error };
};


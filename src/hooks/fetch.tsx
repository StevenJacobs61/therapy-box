import React, { useEffect, useState } from 'react';

interface Data {
    [key: string]: any;
    url:string,
}

const useFetch = ({ url }: Data) => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    async function getData(url: string) {
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error(err);
      }
    }

    getData(url);
  }, [url]);

  return data;
};

export default useFetch;

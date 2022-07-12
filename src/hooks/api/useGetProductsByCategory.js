/* eslint-disable react-hooks/exhaustive-deps */
import {useState} from 'react';
import {client} from '../../utils/client'


export default function useGetProductsByCategory(category) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function fetchData(query) {
    try {
      setLoading(true)
      const response = await client.fetch(query, {category: category});
      setData(response);
      setLoading(false)
    } catch(err) {
      setError(err)
      setLoading(false)
    }
  }

  return {data, loading, error, search: (externalQuery) => fetchData(externalQuery)};
}

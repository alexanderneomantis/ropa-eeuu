import {useState, useEffect} from 'react';
import groq from 'groq'
import {client} from "../../utils/client";

const query = groq `*[_type == 'category' && isFeatured == true ]`

export default function useGetCategories() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true)
      const response = await client.fetch(query);
      setData(response);
      setLoading(false)
    } catch (err) {
      setError(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])
  return {data, loading, error};
}

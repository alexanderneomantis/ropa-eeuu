import {useState, useEffect} from 'react';
import groq from "groq";
import {client} from "../../utils/client";

const query = groq`*[_type == 'questions'] { _id, section, questions }`

export default function useGetQuestions() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setLoading(true)
      const response = await client.fetch(query);
      console.log(response);
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

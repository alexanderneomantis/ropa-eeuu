import {useState, useEffect} from 'react';
import groq from 'groq';
import {client} from '../../utils/client'

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}


export default function UseGetRandomProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = groq`
  *[_type == 'product'] {
  title,
  _id,
  "slug": slug.current,
  price,
  shortDescription,
  longDescription,
  lastPrice,
  width,
  materials,
  height,
  depth,
  images,
  isNew,
  isFeatured,
  "category": category->title,
}
`

  async function fetchData() {
    try {
      setLoading(true)
      const response = await client.fetch(query);
      setData(getMultipleRandom(response, 8))
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

  return [data, loading, error];
}

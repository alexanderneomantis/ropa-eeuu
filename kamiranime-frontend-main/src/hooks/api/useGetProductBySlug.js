import {useState, useEffect} from 'react';
import groq from 'groq';
import {client} from '../../utils/client'


export default function UseGetProductBySlug(slug) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null);

  const query = groq`
  *[_type == 'product' && slug.current ==  $slug ] {
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

  const reviewsQuery = groq` 
  *[_type == 'reviews' && product.id == $id] | order(_createdAt desc) {
    _createdAt,
    _id,
    product,
    comment,
    email,
    name,
  }
  `

  async function fetchData(slug, flag) {
    try {
      flag && setLoading(true)
      const response = await client.fetch(query, {slug: slug});
      const productReviews = await client.fetch(reviewsQuery, {id: response[0]._id})
      setComments(productReviews)
      setData(response);
      flag && setLoading(false)
    } catch (err) {
      setError(err)
      flag && setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(slug, true)
    // eslint-disable-next-line
  }, [])

  return {data, comments, reFetcher: (externalSlug, externalFlag) => fetchData(externalSlug, externalFlag), loading, error};
}

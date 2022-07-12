import {Box, Grid, Typography} from "@mui/material";
import Product from "../products/Product";
import useGetFeatured from "../../hooks/api/useGetFeatured";
import { useNavigate} from 'react-router-dom';
import ProductSkeleton from "../skeletons/ProductSkeleton";

export default function FeaturedGrid() {
  const { data, loading } = useGetFeatured()
  const navigate = useNavigate()

  return (
    <>
      <Grid container spacing={2} sx={{ my: 5, py: 5 }}>
        {loading &&
          <ProductSkeleton xs={12} sm={6} md={3} />
        }
        {
          !loading &&data && data.length > 0 &&data.map((el) => (
            <Grid item xs={12} sm={6} md={3} key={el._id} sx={{display: 'flex', justifyContent: 'center'}}>
              <Product product={el} />
            </Grid>
          ))
        }
      </Grid>
      <Box display='flex' justifyContent='center' >
        <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate('/categorias/products')} color='#DB2E71' variant='h6'>Ver mas</Typography>
      </Box>
    </>

  )
}

import {Box, Grid, Typography} from "@mui/material";
import useGetCategories from "../../hooks/api/useGetCategories";
import {urlFor} from "../../utils/image";
import {useNavigate} from 'react-router-dom'
import {addCommas, removeNonNumeric} from "../../utils/format";
import CategoriesSkeleton from "../skeletons/CategoriesSkeleton";

export default function FeaturedCategories() {
  const navigate = useNavigate();
  const {data, loading} = useGetCategories()

  return (
    <Grid container spacing={2} justifyContent='center' sx={{my: 5, pb: 5}}>
      {
        loading &&
        <CategoriesSkeleton />
      }
      {
        !loading && data && data.length > 0 && data.map(category => (
          <Grid item xs={12} sm={6} md={4} key={category._id} sx={{cursor: 'pointer'}}
                onClick={() => navigate(`/categorias/${category.title}`)}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: theme => theme.palette.secondary.main
            }}>
              <Box sx={{pl: 5}}>
                <Typography variant='h5' color='primary.dark'>{category.title}</Typography>
                <Typography>Desde ${addCommas(removeNonNumeric(category.promotionalPrice))}</Typography>
              </Box>
              <Box
                component='img'
                width={200}
                src={urlFor(category.image.asset)}
              />
            </Box>
          </Grid>
        ))
      }
    </Grid>
  )
}

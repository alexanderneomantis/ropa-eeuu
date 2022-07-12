import {styled} from "@mui/material/styles";
import Page from "../components/Page";
import {useContext} from "react";
import {Store} from "../context/StoreContext";
import {Box, Container, Grid, IconButton, Typography} from "@mui/material";
import {addCommas, removeNonNumeric} from "../utils/format";
import {useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const RootStyle = styled(Page)(({theme}) => ({
  minHeight: "100%",
  overflowX: 'hidden',
  width: "100%",
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));


export default function Favorites() {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(Store)

  function goToDetail(product) {
    navigate(`/categorias/${product.category}/${product.slug}`)
  }

  function removeItem(item) {
    dispatch({type: 'REMOVE_FAVORITE', payload: item})
  }

  return (
    <RootStyle title='Favoritos | Kamiranime'>
      <Container>
        {
          state.favoriteItems.length < 1 && <p>no hey productos favoritos...</p>
        }
        {
          state.favoriteItems.length > 0 && state.favoriteItems.map((item, i) => (
            <Grid container key={item._key} sx={{ my: 2, borderBottom: '1px solid #F6E7FE', pb: 3}} align='center'>
              {/*<p>{i}</p>*/}
              {/*<p>{item._key}</p>*/}
              <Grid item xs={12} sm={3}>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => goToDetail(item)}
                  component='img'
                  src={item.image}
                />
              </Grid>
              <Grid item xs={12} sm={9} align='left'>
                <Box sx={{ pl: 5 }}>
                  <Box display='flex' justifyContent='space-between'>
                    <Typography  variant='h2' color='#683A83' sx={{ cursor: 'pointer' }} onClick={() => goToDetail(item)}>{item.title}</Typography>
                    <Box display='flex' alignItems='center'>
                      <Typography variant='caption' color='#E61B59'>Quitar</Typography>
                      <IconButton onClick={() => removeItem(item)}>
                        <CloseIcon style={{ color: '#E61B59' }}/>
                      </IconButton>
                    </Box>
                  </Box>
                  {
                    item.lastPrice &&
                    <Typography  variant='h4' sx={{textDecoration: 'line-through', mr: 2}} fontWeight='bold'
                                color='primary.main'>${addCommas(removeNonNumeric(item.lastPrice))}</Typography>
                  }
                  <Typography  fontWeight='bold' variant='h4'>${addCommas(removeNonNumeric(item.price))}</Typography>
                </Box>
              </Grid>
            </Grid>
          ))
        }
      </Container>
    </RootStyle>
  )
}

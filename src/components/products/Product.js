import {Box, IconButton, Paper, styled, Typography} from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {urlForThumbnail} from '../../utils/image'
import {useContext} from "react";
import {Store} from "../../context/StoreContext";
import {addCommas, removeNonNumeric} from '../../utils/format'

const UpsideBox = styled(Box)({
  position: 'relative',
  backgroundColor: '#F8EDF6',
  ":hover": {
    "& .MuiBox-root": {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, .3)',
      transition: 'all 200ms ease',
    }
  }
})

export default function Product({product = {}}) {
  const navigate = useNavigate()
  const {state: {cart: {cartItems}, favoriteItems}, dispatch} = useContext(Store)

  // console.log(favoriteItems);

  function goToDetail() {
    navigate(`/categorias/${product.category}/${product.slug}`)
  }

  function addToFavorites(item) {
    console.log(item);
    const existItem = favoriteItems.find(x => x._key === item._id)
    console.log(existItem)

    if (existItem) {
      dispatch({type: 'REMOVE_FAVORITE', payload: {
          _key: item._id,
        }})
    } else {
      dispatch({
        type: 'ADD_FAVORITE', payload: {
          _key: item._id,
          title: item.title,
          slug: item.slug,
          category: item.category,
          price: item.price,
          image: urlForThumbnail(item.images[0].asset),
        }
      })
    }
  }

  function addToCart(item) {
    const existItem = cartItems.find(x => x._key === item._id)
    const quantity = existItem ? existItem.quantity + 1 : 1;

    dispatch({
      type: 'ADD_ITEM', payload: {
        _key: item._id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        price: item.price,
        image: urlForThumbnail(item.images[0].asset),
        quantity
      }
    })
    navigate('/carrito');
  }

  return (
    <Paper sx={{maxWidth: '300px'}}>
      <UpsideBox>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'none',
          display: 'none',
        }}>
          <IconButton color='primary' onClick={() => addToCart(product)}><ShoppingCartIcon/></IconButton>
          <IconButton color='primary' onClick={() => goToDetail()}><VisibilityIcon/></IconButton>
        </Box>
        <Box
          component="img"
          src={urlForThumbnail(product.images[0].asset)}
          alt="Paella dish"
          height='300px'
          width='300px'
        />
      </UpsideBox>
      <Box sx={{p: 3}}>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1}}>
          <Typography variant='body1' fontWeight='bold'>{product.title}</Typography>
          <IconButton onClick={() => addToFavorites(product)}>
            {
              favoriteItems.filter(item => item._key === product._id).length > 0
                ? <FavoriteIcon style={{ color: '#683A83' }} />
                : <FavoriteBorderIcon style={{ color: '#683A83' }} />
            }
          </IconButton>
        </Box>
        <Box sx={{display: 'flex'}}>
          {
            product.lastPrice &&
            <Typography variant='body1' sx={{textDecoration: 'line-through', mr: 2}} fontWeight='bold'
                        color='primary.main'>${addCommas(removeNonNumeric(product.lastPrice))}</Typography>
          }
          <Typography fontWeight='bold' variant='body1'>${addCommas(removeNonNumeric(product.price))}</Typography>
        </Box>
      </Box>
    </Paper>
  )
}

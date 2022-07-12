import {Box, IconButton, Paper, TableCell, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {MHidden} from "../@material-extend";
import {Store} from '../../context/StoreContext'
import { addCommas, removeNonNumeric } from '../../utils/format'

export default function CartProduct({ product }) {
  const {dispatch} = useContext(Store);
  const navigate = useNavigate()
  const [count, setCount] = useState(product.quantity)

  async function updateCartHandler(item, quantity) {
    if (quantity > 0) {
      dispatch({
        type: 'ADD_ITEM', payload: {
          _key: item._key,
          title: item.title,
          category: item.category,
          slug: item.slug,
          price: item.price,
          image: item.image,
          quantity
        }
      })
    } else {
      removeItemHandler(item);
    }
  }

  function removeItemHandler(item) {
    dispatch({type: 'REMOVE_ITEM', payload: item})
  }


  return (
    <>
      <MHidden width='mdDown'>
        <TableCell>
          <Box onClick={() => navigate(`/${product.category}/${product.slug}`)} sx={{ cursor: 'pointer' }}>
            <Box component='img' src={product.image} alt={product.title} width={50} height={50}/>
          </Box>
        </TableCell>
        <TableCell>
          <Typography sx={{ cursor: 'pointer' }} onClick={() => navigate(`/${product.category}/${product.slug}`)}>{product.title}</Typography>
        </TableCell>
        <TableCell>
          <Box sx={{display: 'flex', alignItems: 'center', my: 3, justifyContent: 'center', width: 'fit-content'}}>
            <IconButton onClick={() => updateCartHandler(product, product.quantity - 1)} color='primary'><RemoveIcon/></IconButton>
            <Typography sx={{width: '50px'}} align='center'>{product.quantity}</Typography>
            <IconButton onClick={() => updateCartHandler(product, product.quantity + 1)} color='primary'><AddIcon/></IconButton>
          </Box>
        </TableCell>
        <TableCell>
          <Typography>$ {addCommas(removeNonNumeric(product.price))}</Typography>
        </TableCell>
        <TableCell>
          <IconButton variant='contained' color='primary' onClick={() => removeItemHandler(product)}>
            <DeleteIcon/>
          </IconButton>
        </TableCell>
      </MHidden>
      <MHidden width='mdUp'>
        <Paper elevation={2} sx={{textAlign: 'center', my: 2, py: 2}}>
          <Box onClick={() => navigate(`/${product.category}/${product.slug}`)} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
            <Box component='img' src={product.image} alt={product.title} />
          </Box>
          <Typography sx={{ cursor: 'pointer' }} variant='h6' onClick={() => navigate(`/${product.category}/${product.slug}`)}>{product.title}</Typography>
          <Box sx={{display: 'flex', alignItems: 'center', my: 3, justifyContent: 'center'}}>
            <IconButton onClick={() => updateCartHandler(product, product.quantity - 1)} color='primary'><RemoveIcon/></IconButton>
            <Typography sx={{width: '50px'}} align='center'>{product.quantity}</Typography>
            <IconButton onClick={() => updateCartHandler(product, product.quantity + 1)} color='primary'><AddIcon/></IconButton>
          </Box>
          <Typography variant='h3'>$ {addCommas(removeNonNumeric(product.price))}</Typography>
          <IconButton variant='contained' color='primary' onClick={() => removeItemHandler(product)}>
            <DeleteIcon/>
          </IconButton>
        </Paper>
      </MHidden>
    </>
  )
}

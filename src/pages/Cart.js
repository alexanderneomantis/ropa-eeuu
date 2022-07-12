import {styled} from "@mui/material/styles";
import Page from "../components/Page";
import BreadCrumb from "../components/BreadCrumb";
import {useState, useContext, useEffect} from 'react';
import {
  Container, Select, Grid,
  Table,
  Button,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box, TextField,
} from "@mui/material";
import CartProduct from "../components/products/CartProduct";
import {MHidden} from "../components/@material-extend";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {Store} from "../context/StoreContext";
import {addCommas, removeNonNumeric} from '../utils/format'
import { regions, towns } from '../utils/staticData'

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const RootStyle = styled(Page)(({theme}) => ({
  minHeight: "100%",
  width: "100%",
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    paddingTop: APP_BAR_DESKTOP,
  },
}));

const StyledCell = styled(TableCell)(() => ({
  backgroundColor: '#F8EDF6'
}))


export default function Cart() {
  const [checkoutValues, setCheckoutValues] = useState({
    city: '',
    region: '',
    code: '',
    coupon: '',
  })
  const {state: {cart: {cartItems}}} = useContext(Store)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
  }, [cartItems])

  function getSubTotal() {
    return cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  }

  function handleChange(val, name) {
    setCheckoutValues(prevState => ({
      ...prevState,
      [name]: val
    }))
  }

  function handleDeliveryExtra(operation, amount) {
    if (operation) {
      setTotal(prevState => prevState + amount)
    } else {
      setTotal(prevState => prevState - amount)
    }
  }
  return (
    <RootStyle title='Carrito de compras | Kamiranime'>
      <BreadCrumb/>
      <Container>
        <Typography sx={{my: 5}} variant='h1' color='primary.dark'>Los productos de tu carrito</Typography>

        <MHidden width='mdDown'>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledCell>Imagen</StyledCell>
                  <StyledCell>Nombre de producto</StyledCell>
                  <StyledCell>Cantidad</StyledCell>
                  <StyledCell>Precio</StyledCell>
                  <StyledCell>Accion</StyledCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  cartItems.length > 0 && cartItems.map((item, i) => (
                    <TableRow key={item._key + i}>
                      <CartProduct product={item}/>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          {cartItems.length < 1 && <Typography sx={{p: 5}}>No hay productos en el carrito...</Typography>}
        </MHidden>

        <MHidden width='mdUp'>
          {cartItems.length > 0 && cartItems.map((el, i) =>  <CartProduct product={el} key={el._key + i}/>)}
          {cartItems.length < 1 && <Typography sx={{p: 5}}>No hay productos en el carrito...</Typography>}
        </MHidden>
        <Grid container spacing={2} sx={{my: 5}}>
          <Grid item xs={12} md={4}>
            <Box sx={{backgroundColor: '#F4F4F4', p: 4, height: '100%'}}>
              <Typography variant='h4' sx={{mb: 2}}>Estimado de envío</Typography>
              <Typography variant='body1' sx={{mb: 2}}>Ingresa tu destino para tener un aproximado del envío
                correspondiente.</Typography>

              <Typography>Región</Typography>
              <Select
                labelId="region"
                id="regionid"
                size='small'
                value={checkoutValues.region}
                sx={{mb: 2, width: '100%', backgroundColor: '#fff'}}
                onChange={e => handleChange(e.target.value, 'region')}
              >
                <MenuItem value={''}>Seleccionar Region</MenuItem>
                {towns.map((town, i) =>  <MenuItem key={town + i} value={town}>{town}</MenuItem>)}
              </Select>

              <Typography>Ciudad</Typography>
              <Select
                labelId="city"
                size='small'
                id="cityid"
                value={checkoutValues.city}
                sx={{mb: 2, width: '100%', backgroundColor: '#fff'}}
                onChange={e => handleChange(e.target.value, 'city')}
              >
                <MenuItem value={''}>Seleccionar Ciudad</MenuItem>
                {regions.map((region, i) => <MenuItem key={region + i} value={region}>{region}</MenuItem>)}
              </Select>

              <Typography>Codigo postal</Typography>
              <TextField
                fullWidth
                type="text"
                value={checkoutValues.code}
                size="small"
                onChange={e => handleChange(e.target.value, 'code')}
                placeholder="000000000"
                sx={{mb: 2, backgroundColor: '#fff'}}
              />

            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{backgroundColor: '#F4F4F4', p: 4, height: '100%'}}>
              <Typography variant='h4' sx={{mb: 2}}>Usar cupon de descuento</Typography>
              <Typography variant='body1' sx={{mb: 2}}>Si tienes algún cupón de descuento ingresado acá.</Typography>

              <Typography>Cupon de descuento</Typography>
              <TextField
                fullWidth
                type="text"
                value={checkoutValues.coupon}
                size="small"
                onChange={e => handleChange(e.target.value, 'coupon')}
                placeholder="000000000"
                sx={{mb: 2, backgroundColor: '#fff'}}
              />

            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{backgroundColor: '#F4F4F4', p: 4, height: '100%'}}>
              <Typography variant='h4' sx={{mb: 2}}>Carrito</Typography>
              <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='body1'>total productos</Typography>
                <Typography variant='h6'>$ {addCommas(removeNonNumeric(getSubTotal()))}</Typography>
              </Box>
              <Box mb={5}>
                <Typography>Total envió</Typography>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <FormControlLabel
                    control={<Checkbox onChange={(e) => handleDeliveryExtra(e.target.checked, 2000)}/>}
                    label={<Typography variant="body1">Standar </Typography>}
                  />
                  <Typography> $2.000</Typography>
                </Box>
                <Box display='flex' alignItems='center' justifyContent='space-between'>
                  <FormControlLabel
                    control={<Checkbox onChange={(e) => handleDeliveryExtra(e.target.checked, 5000)}/>}
                    label={<Typography variant="body1">Express</Typography>}
                  />
                  <Typography> $5.000</Typography>
                </Box>
              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='h4' color='primary'>Total carrito</Typography>
                <Typography variant='h3' color='primary'>$ {addCommas(removeNonNumeric(total))}</Typography>
              </Box>

              <Button  color='primary' sx={{width: '100%', mt: 3}}>
                Comprar
              </Button>

            </Box>
          </Grid>

        </Grid>
      </Container>
    </RootStyle>
  )
}

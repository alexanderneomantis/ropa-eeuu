import {Link as RouterLink, useLocation} from "react-router-dom";
// material
import {styled} from "@mui/material/styles";
import {AppBar, Badge, Box, IconButton, Toolbar, Menu, Button, Typography} from "@mui/material";
// hooks
import useOffSetTop from "../../hooks/useOffSetTop";
// components
import {MHidden} from "../../components/@material-extend";
import Logo from '../../assets/km-horizontal-logo.svg'
import heart from '../../assets/icons/heart-icon.svg'
import cart from '../../assets/icons/cart.svg'
import search from '../../assets/icons/search.svg'
//
import MenuDesktop from "./MenuDesktop";
import MenuMobile from "./MenuMobile";
import navConfig from "./menuConfig";
import {useContext, useState, useEffect} from "react";
import {Store} from "../../context/StoreContext";
import {useNavigate} from 'react-router-dom';
import {addCommas, removeNonNumeric} from "../../utils/format";
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(["height", "background-color"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("md")]: {
    height: APP_BAR_DESKTOP,
  },
}));

const ToolbarShadowStyle = styled("div")(({theme}) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: "auto",
  borderRadius: "50%",
  position: "absolute",
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));


const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    right: 6,
    top: 10,
    color: '#fff',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '6px',
  },
}));

// ----------------------------------------------------------------------

export default function Header() {
  const isOffset = useOffSetTop(1);
  const {pathname} = useLocation();
  const {state: {cart: {cartItems}, favoriteItems}, dispatch} = useContext(Store)
  const isHome = pathname === "/";
  const navigate = useNavigate();
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setTotal(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))
  }, [cartItems])


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const goToCart = () => {
    setAnchorEl(null);
    navigate('/carrito');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function removeItemHandler(item) {
    dispatch({type: 'REMOVE_ITEM', payload: item})
  }

  return (
    <AppBar sx={{boxShadow: 0, bgcolor: "transparent"}}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: "background.default",
            height: {md: APP_BAR_DESKTOP - 20},
          }),
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <RouterLink to="/">
            {/*<Logo/>*/}
            <MHidden width='mdDown'>
              <img src={Logo} width={200} alt="kamiranime logo"/>
            </MHidden>
            <MHidden width='mdUp'>
              <img src={Logo} width={133} alt="kamiranime logo"/>
            </MHidden>
          </RouterLink>

          {/*<Box sx={{flexGrow: 1}}/>*/}

          <MHidden width="mdDown">
            <MenuDesktop
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>

          <Box>
            {/*<RouterLink to='/buscar'>*/}
            {/*  <IconButton aria-label="Lupa de busqueda">*/}
            {/*    <img width={25} height={25} src={search} alt="search icon"/>*/}
            {/*  </IconButton>*/}
            {/*</RouterLink>*/}

            {/*<RouterLink to='/carrito'>*/}
            <StyledBadge badgeContent={cartItems.length} color='primary'>
              <IconButton
                aria-label="carrito de compras"
                aria-controls={open ? 'carrito-de-compras' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <img width={25} height={25} src={cart} alt="cart icon"/>
              </IconButton>
            </StyledBadge>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <Box sx={{width: 350, height: 400}} display='flex' flexDirection='column' justifyContent='space-between'>
                {
                  cartItems && cartItems.length > 0 && cartItems.map(item => (
                    <FloatCartItem item={item} remove={removeItemHandler} key={item._key}/>
                  ))
                }
                {
                  cartItems.length < 1 &&
                  <Box display='flex' justifyContent='center' my={5}>
                    <Typography>No hay productos en el carrito...</Typography>
                  </Box>
                }

                <Box py={3}>
                  <Box display='flex' justifyContent='space-between' px={5} py={2}>
                    <Typography>Comprando:</Typography>
                    <Typography>$ {addCommas(removeNonNumeric(total))}</Typography>
                  </Box>
                  <Box display='flex' justifyContent='center' >
                    <Button sx={{backgroundColor: '#DB2E71', color: '#fff'}} onClick={() => goToCart()}>Ir al
                      carrito</Button>
                  </Box>
                </Box>
              </Box>
            </Menu>
            {/*</RouterLink>*/}

            <RouterLink to='/favoritos'>
              <StyledBadge badgeContent={favoriteItems.length} color='primary'>
                <IconButton aria-label="vista de favoritos">
                  <img width={25} height={25} src={heart} alt="fav icon"/>
                </IconButton>
              </StyledBadge>
            </RouterLink>
          </Box>

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              isHome={isHome}
              navConfig={navConfig}
            />
          </MHidden>
        </Box>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle/>}
    </AppBar>
  );
}

function FloatCartItem({item, remove}) {
  const navigate = useNavigate();
  return (
    <Box display='flex' justifyContent='space-between' pb={1} mb={2} mt={1} sx={{borderBottom: '1px solid lightgray'}}>
      <Box display='flex'>
        <Box
          component='img'
          src={item.image}
          sx={{width: 80, mr: 2}}
        />
        <Box>
          <Typography sx={{ "&:hover": {cursor: 'pointer', color: 'gray'} }} onClick={() => navigate(`/${item.category}/${item.slug}`)} color='#DB2E71' fontWeight='bold'>{item.title}</Typography>
          <Typography color='gray'>x {item.quantity}</Typography>
          <Typography color='gray'>$ {addCommas(removeNonNumeric(item.price))}</Typography>
        </Box>
      </Box>
      <Box mx={2}>
        <IconButton onClick={() => remove(item)}>
          <CloseIcon style={{color: '#683A83'}}/>
        </IconButton>
      </Box>
    </Box>
  )
}

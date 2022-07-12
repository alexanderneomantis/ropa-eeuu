import BreadCrumb from "../../components/BreadCrumb";
import {styled} from "@mui/material/styles";
import Page from "../../components/Page";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {useContext, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import useGetProductBySlug from '../../hooks/api/useGetProductBySlug'
import {urlFor, urlForThumbnail} from "../../utils/image";
import {addCommas, removeNonNumeric, capitalizeFirstLetter } from "../../utils/format";
import {PortableText} from "@portabletext/react";
import ProductComment from "../../components/products/ProductComment";
import CommentForm from "../../components/products/CommentForm";
import {Store} from '../../context/StoreContext'
import CarouselCenterMode from "../../components/carousel/CarouselCenterMode";
import UseGetRandomProducts from "../../hooks/api/useGetRandomProducts";
import {CarouselBasic3} from "../../components/carousel";
import ProductDetailSkeleton from "../../components/skeletons/ProductDetailSkeleton";

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

export default function Detail() {
  const navigate = useNavigate();
  const {state: {cart: {cartItems}}, dispatch} = useContext(Store);
  const {slug} = useParams()
  const {data, comments, reFetcher, loading} = useGetProductBySlug(slug);
  const [similarProducts, similarLoading] = UseGetRandomProducts();
  const [count, setCount] = useState(1);
  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function addToCart(item) {
    const existItem = cartItems.find(x => x._key === item._id)
    const quantity = existItem ? existItem.quantity + count : count;

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
    <RootStyle>
      <BreadCrumb/>
      {loading && <ProductDetailSkeleton />}
      {
        !loading && data && data.length > 0 &&
        <Container>
          <Grid container spacing={4} sx={{ mt: 5 }}>
            <Grid item xs={12} md={6}>
                {
                  data[0].images && data[0].images.length > 0 &&
                  <Box sx={{
                    width: "100%",
                    borderRadius: 1,
                    // boxShadow: "0px 3px 6px #00000029;",
                    position: 'relative'
                  }}>
                    <Box sx={{overflow: "hidden", position: "relative"}}>
                      <CarouselBasic3 data={data[0].images} type='product' />
                    </Box>
                  </Box>
                }

            </Grid>
            <Grid item xs={12} md={6} alignSelf='center'>
              <Typography variant='h1' color='primary.dark' sx={{ my: 3 }}> {data[0].title}</Typography>
              <Box sx={{display: 'flex'}}>
                {
                  data[0].lastPrice &&
                  <Typography variant='h3' color='primary' sx={{
                    mr: 5,
                    textDecoration: 'line-through '
                  }}> ${addCommas(removeNonNumeric(data[0].lastPrice))}</Typography>
                }
                <Typography variant='h3'> ${addCommas(removeNonNumeric(data[0].price))}</Typography>
              </Box>
              <Typography variant='body1' sx={{my: 4}}>{data[0].shortDescription}</Typography>
              <Box>
                <Typography>- {data[0].width} x {data[0].height} x {data[0].depth}</Typography>
              </Box>
              <Box sx={{my: 2}}>
                {
                  data[0].materials && data[0].materials.length > 0 && data[0].materials.map((material, i) => (
                    <Typography key={i + 1}>- {material}</Typography>
                  ))
                }
              </Box>

              <Box sx={{display: 'flex', alignItems: 'center', my: 3, justifyContent: 'center'}}>
                <IconButton onClick={() => setCount(prevState => --prevState)}
                            color='primary'><RemoveIcon/></IconButton>
                <Typography sx={{width: '50px'}} align='center'>{count}</Typography>
                <IconButton onClick={() => setCount(prevState => ++prevState)} color='primary'><AddIcon/></IconButton>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Button sx={{ backgroundColor: '#DB2E71', color: '#fff' }} onClick={() => addToCart(data[0])}>Agregar al
                  carrito</Button>
              </Box>
              <Box sx={{mt: 5}}>
                <Typography>Categoria: {capitalizeFirstLetter(data[0].category)}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{width: '100%', mt: 5}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <Tabs value={tabValue} onChange={handleChange} centered aria-label="basic tabs example">
                <Tab label="Descripcion" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel tabValue={tabValue} index={0}>
              <Box sx={{my: 5}}>
                <PortableText value={data[0].longDescription}/>
              </Box>
            </TabPanel>
            <TabPanel tabValue={tabValue} index={1}>
              {
                (!comments || comments.length < 1) &&
                <Box>
                  <Box sx={{backgroundColor: '#637381', px: 4, py: 2, width: 'fit-content'}}>
                    <Typography color='#fff'>Aún no hay reviews</Typography>
                  </Box>
                  <Typography sx={{mt: 3, mb: 1}} fontWeight='bold'>Sé el primero en hacer una review</Typography>
                </Box>
              }
              {
                comments.length > 0 && comments.map(comment => (
                  <ProductComment reload={() => reFetcher(slug)}  comment={comment} />
                ))
              }
              <Typography sx={{ pt: 2 }}>Tu dirección de email no será publicada. Los campos obligatorios están marcados*.</Typography>
              <CommentForm product={{id: data[0]._id, name: data[0].title}} reload={() => reFetcher(slug)}/>
            </TabPanel>
          </Box>

          <Box sx={{my: 5}}>
            <Typography
              variant='h2'
              align='center'
              sx={{width: '100%', borderBottom: '3px solid #F2B1CA', lineHeight: '0.1em', margin: '10px 0 20px'}}
            >
              <span style={{background: '#fff', padding: '0 15px'}}>Productos Similares</span>
            </Typography>
          </Box>
          {/*TODO hacer un carousel component de productos " destacados" y que sea siempre 4 aleatorios...  o mas ? y hacer schema de timer y de HOT SALE*/}
          {
            !similarLoading && similarProducts && similarProducts.length > 0 &&
            <CarouselCenterMode data={similarProducts} />
          }
      </Container>
      }
    </RootStyle>
  )
}

function TabPanel(props) {
  const {children, tabValue, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {tabValue === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

import {styled} from "@mui/material/styles";
import Page from '../components/Page'
import { Container, Typography} from "@mui/material";
import DeyOffer from "../components/DayOffer";
import HowWeWork from "../components/home/HowWeWork";
import FeaturedCategories from "../components/home/FeaturedCategories";
import MainBanner from "../components/home/MainBanner";
import FeaturedGrid from "../components/home/FeaturedGrid";

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


export default function Home() {

  return (
    <RootStyle title='Home | Kamiranime'>
      <MainBanner />
      <Container>
        <FeaturedCategories/>
        <Typography variant='h4' sx={{color: theme => theme.palette.primary.dark, pb: 2}}>Mejores ventas <span style={{
          paddingBottom: '5px',
          marginLeft: '1rem',
          borderBottom: '4px solid #F8EDF6'
        }}>Hot Sales</span></Typography>
        <FeaturedGrid />
      </Container>
      <DeyOffer />
      <HowWeWork/>
    </RootStyle>
  )
}

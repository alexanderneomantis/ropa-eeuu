import Slider from "react-slick";
import PropTypes from "prop-types";
import {useRef} from "react";
// material
import {useTheme, styled} from "@mui/material/styles";
import {Box, Button, Typography} from "@mui/material";
//
import {
  CarouselControlsPaging2,
  CarouselControlsArrowsBasic2,
} from "./controls";
import {urlFor, urlForBanner} from "../../utils/image";
import {MHidden} from "../@material-extend";
import {useNavigate} from 'react-router-dom';

// ----------------------------------------------------------------------


const RootStyle = styled("div")({
  position: "relative",
  "& .slick-track": {
    display: "inline-flex",
  },
});

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({item}) {
  const navigate = useNavigate();
  console.log(item);

  return (
    <Box sx={{position: 'relative'}}>
      <MHidden width='mdDown'>
        <Box
          component='img'
          width='100%'
          src={urlForBanner(item.image.asset)}
          alt={item.image.alt}
        />
      </MHidden>
      <MHidden width='mdUp'>
        <Box
          component='img'
          width='100%'
          src={urlForBanner(item.image.asset)}
          alt={item.image.alt}
          height={350}
          sx={{objectFit: 'cover'}}
        />
      </MHidden>
      <Box sx={{position: 'absolute', bottom: '5%', right: '10%', textAlign: 'end'}}>
        <Typography variant='h1' sx={{mb: 1}} color='primary.dark'>{item.title}</Typography>
        <Typography variant='h4' sx={{mb: 1}} color='#fff'>{item.subtitle}</Typography>
        <Button variant='outlined' onClick={() => navigate(item.url)}>{item.buttonText}</Button>
      </Box>
    </Box>
    // <Box
    //   sx={{ backgroundColor: '#F8EDF6', width: '100%' }}
    //   component='img'
    //   width='100%'
    //   height='100%'
    //   alt={item.alt}
    //   src={urlFor(item)}
    // />
  );
}

function CarouselProductDetail({item}) {
  return (
    <Box
      component='img'
      loading='lazy'
      // alt={item.Alt}
      alt='Imagen de producto'
      sx={{width: '100%', height: {xs: '100%', md: '600'}, objectFit: 'contain'}}
      src={urlFor(item)}
    />
  )
}

export default function CarouselBasic3({data, type = 'banner'}) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    ...CarouselControlsPaging2({
      sx: {mt: 3},
    }),
  };

  // const handlePrevious = () => {
  //   carouselRef.current.slickPrev();
  // };
  //
  // const handleNext = () => {
  //   carouselRef.current.slickNext();
  // };

  return (
    <RootStyle>
      {
        type === 'banner' &&
        <Slider ref={carouselRef} {...settings}>
          {data.map((item) => (
            <CarouselItem key={item._id} item={item}/>
          ))}
        </Slider>
      }
      {
        type === 'product' &&
        <Slider ref={carouselRef} {...settings}>
          {data.map((item, i) => (
            <CarouselProductDetail key={item._id} item={item}/>
          ))}
        </Slider>
      }

      {/*<CarouselControlsArrowsBasic2*/}
      {/*  sx={{ zIndex: 9999 }}*/}
      {/*  onNext={handleNext}*/}
      {/*  onPrevious={handlePrevious}*/}
      {/*/>*/}
    </RootStyle>
  );
}

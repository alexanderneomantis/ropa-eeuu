import Slider from "react-slick";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
// material
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// utils
import mockData from "../../utils/mock-data";
//
import {CarouselControlsArrowsBasic2, CarouselControlsPaging2} from "./controls";
import {useTheme} from "@mui/styles";

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: mockData.text.title(index),
  image: mockData.image.feed(index),
  description: mockData.text.description(index),
}));

const THUMB_SIZE = 64;

const RootStyle = styled("div")(({ theme }) => {
  const isRTL = theme.direction === "rtl";

  return {
    root: {
      "& .slick-slide": {
        float: isRTL ? "right" : "left",
      },
    },
  };
});

const LargeImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

const ThumbImgStyle = styled("img")(({ theme }) => ({
  opacity: 0.48,
  width: THUMB_SIZE,
  cursor: "pointer",
  height: THUMB_SIZE,
  margin: theme.spacing(0, 1),
  borderRadius: theme.shape.borderRadiusSm,
  "&:hover": {
    opacity: 0.72,
    transition: theme.transitions.create("opacity"),
  },
}));

// ----------------------------------------------------------------------

LargeItem.propTypes = {
  item: PropTypes.object,
};

function LargeItem({ item }) {
  const { image, title } = item;

  return (
    <Box
      sx={{
        position: "relative",
        paddingTop: {
          xs: "100%",
          md: "50%",
        },
      }}
    >
      <LargeImgStyle alt={title} src={image} />
    </Box>
  );
}

ThumbnailItem.propTypes = {
  item: PropTypes.object,
};

function ThumbnailItem({ item }) {
  const { image, title } = item;

  return <ThumbImgStyle alt={title} src={image} />;
}

export default function CarouselThumbnail() {
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
      sx: { mt: 3 },
    }),
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <RootStyle>
      <Box
        sx={{
          zIndex: 0,
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Slider ref={carouselRef} {...settings}>
          {MOCK_CAROUSELS.map((item) => (
            <LargeItem key={item} item={item} />
          ))}
        </Slider>
        <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
      </Box>
    </RootStyle>
  );
}

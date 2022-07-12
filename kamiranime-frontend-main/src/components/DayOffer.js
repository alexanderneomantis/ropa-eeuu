import {Box, Button, Grid, Skeleton, Typography} from "@mui/material";
import dayOffer from "../assets/img/dayOffer.png";
import pinkCircle from '../assets/img/circle.png'
import moment from "moment";
import {useCallback, useEffect, useRef, useState} from "react";
import useGetPromotion from "../hooks/api/useGetPromotion";
import {urlFor} from "../utils/image";
import { useNavigate } from 'react-router-dom';

export default function DeyOffer() {
  const {data, loading} = useGetPromotion()
  const navigate = useNavigate()

  // const eventTime = new Date(data.duration).getTime();
  const eventTime = new Date(data.duration).getTime() / 1000;
  const calculateDuration = eventTime => moment.duration(Math.max(eventTime - (Math.floor(Date.now() / 1000)), 0), 'seconds');
  const [duration, setDuration] = useState(calculateDuration(eventTime));
  const timerRef = useRef(0);
  const timerCallback = useCallback(() => {
    setDuration(calculateDuration(eventTime));
  }, [eventTime])

  useEffect(() => {
    timerRef.current = setInterval(timerCallback, 1000);

    return () => {
      clearInterval(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventTime]);


  return (
    <Box>
      {loading && <Skeleton variant='rectangular' width='100%' height={600} />}
      {
        !loading && data && data.isVisible &&
        <Box
          sx={{
            p: 5,
            my: 5,
            backgroundImage: `url(${dayOffer})`,
            zIndex: -1,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{ position: 'absolute', zIndex: 1 }}
                  component='img'
                  src={pinkCircle}
                />
                {
                  data && data.product && data.product.images.length > 0 &&
                  <Box
                    sx={{ zIndex: 2 }}
                    component='img'
                    src={urlFor(data.product.images[0].asset)}
                  />
                }
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} alignSelf='center'>
              <Typography variant='h2' align='center' color='primary'> Oferta del dia</Typography>
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Box>
                  <Typography fontSize='3.5rem' fontWeight='bold' color='primary.dark'
                              align='center'>{duration.days()}</Typography>
                  <Typography  fontSize='2.5rem' fontWeight='bold' color='primary.dark'
                              align='center'>Dias</Typography>
                </Box>
                <Box sx={{mx: 2}}>
                  <Typography fontSize='3.5rem' fontWeight='bold' color='primary.dark'
                              align='center'>{duration.hours()}</Typography>
                  <Typography  fontSize='2.5rem' fontWeight='bold'  color='primary.dark' align='center'>Hrs</Typography>
                </Box>
                <Box sx={{mx: 2}}>
                  <Typography fontSize='3.5rem' fontWeight='bold' color='primary.dark'
                              align='center'>{duration.minutes()}</Typography>
                  <Typography fontSize='2.5rem' fontWeight='bold'  color='primary.dark' align='center'>Min</Typography>
                </Box>
                <Box>
                  <Typography fontSize='3.5rem' fontWeight='bold' color='primary.dark'
                              align='center'>{duration.seconds()}</Typography>
                  <Typography  fontSize='2.5rem' fontWeight='bold'  color='primary.dark' align='center'>Seg</Typography>
                </Box>
              </Box>
              <Box sx={{display: 'flex', justifyContent: 'center', mt: 5}}>
                <Button variant='outlined' onClick={() => navigate(`/categorias/${data.product.category}/${data.product.slug}`)}>Comprar ahora</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      }
    </Box>
  )
}

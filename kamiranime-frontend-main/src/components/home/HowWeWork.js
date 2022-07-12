import {Box, Grid, Typography} from "@mui/material";
import deliveries from '../../assets/img/entregas.svg'
import envios from '../../assets/img/envios.svg'
import despacho from '../../assets/img/despacho.svg'

export default function HowWeWork() {
  return (
    <Box sx={{ py: 5}}>
      <Typography variant='h2' align='center' color='primary' sx={{ my: 5 }}>¿Cómo trabajamos?</Typography>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12} sm={6} md={4} sx={{ position: 'relative' }}>
          <Box
            component='img'
            sx={{ width: '100%' }}
            src={deliveries}
          />
          <Box sx={{ position: 'absolute', zIndex: 11, top: '30%', left: '10%' }}>
            <Typography variant='h4' color='primary.dark'> Entregas en metro L5</Typography>
            <Typography variant='body1' fontSize='1.2rem'>
              De Santa Ana a Plaza Maipú
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ position: 'relative' }}>
          <Box
            component='img'
            sx={{ width: '100%' }}
            src={envios}
          />
          <Box sx={{ position: 'absolute', zIndex: 11, top: '30%', left: '10%' }}>
            <Typography variant='h4' color='primary.dark'> Envíos Starken y Correos Chile</Typography>
            <Typography variant='body1' fontSize='1.2rem'>
              Solo los Viernes
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ position: 'relative' }}>
          <Box
            component='img'
            sx={{ width: '100%' }}
            src={despacho}
          />
          <Box sx={{ position: 'absolute', zIndex: 11, top: '30%', left: '10%' }}>
            <Typography variant='h4' color='primary.dark'> Despacho a domicilio</Typography>
            <Typography variant='body1' fontSize='1.2rem'>
              Martes y Viernes 24 hrs
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

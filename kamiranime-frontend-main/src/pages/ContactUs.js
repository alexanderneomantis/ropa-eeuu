import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import background from '../assets/img/contact.jpg'
import ContactForm from "../components/contact/ContactForm";

export default function ContactUs() {
  return (
    <Box>
      <Box
        component='img'
        src={background}
        sx={{ width: '100%' }}
      />
      <Container>
        <Grid container spacing={3}>
          {/*<Grid item xs={12} md={6} align='center'>*/}
          {/*  <Paper elevation={2} sx={{ p: 3, marginTop: '-2rem' }}>*/}
          {/*    <Typography>Whatsapp</Typography>*/}
          {/*  </Paper>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={12} md={6} align='center'>*/}
          {/*  <Paper elevation={2} sx={{ p: 3, marginTop: '-2rem' }}>*/}
          {/*    <Typography>Espacio fisico</Typography>*/}
          {/*  </Paper>*/}
          {/*</Grid>*/}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 5, mb: 3, marginTop: '-5rem' }}>
              <Typography textAlign='center' variant='h1'>Contactanos</Typography>
              <ContactForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>

    </Box>
  )
}

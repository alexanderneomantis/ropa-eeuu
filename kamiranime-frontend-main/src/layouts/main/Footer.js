// import { Link as RouterLink } from "react-router-dom";
// material
import { styled } from "@mui/material/styles";
import { Box, Container, Grid, Typography, List, ListItem } from "@mui/material";
//
import Logo from "../../assets/km-vertical-logo.svg";
import { useNavigate } from 'react-router-dom';
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: '#FAF2FF',
  // borderTop: "1rem solid " + grey[100],
  borderBottom: "1rem solid " + theme.palette.primary.main,
  [theme.breakpoints.up("md")]: {
    // borderTop: "3rem solid " + grey[100],
  },
}));

const Link = styled(Typography)({
  "&:hover": {
    transition: 'color 200ms ease ',
    color: 'pink',
    cursor: 'pointer'
  }
})


export default function Footer() {
  const navigate = useNavigate();

  function openUrl(url) {
    window.open(url, '_blank', '')
  }

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid
          container
          justifyContent={{ xs: "center", md: "space-between" }}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Grid
            item
            xs={6}
            md={3}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box component='img' src={Logo} alt="kamiranime logo"/>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", alignItems: "start", pr: 1 }}
          >
          <List>
            <ListItem>
              <Typography variant='h4'  color='primary.dark'>Sobre nosotros</Typography>
            </ListItem>
            <ListItem><Link onClick={() => navigate('/contactanos')}>Contactanos</Link></ListItem>
            <ListItem><Link onClick={() => navigate('')}>Kamiranime</Link></ListItem>
          </List>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", alignItems: "start", pr: 1 }}
          >
            <List>
              <ListItem>
                <Typography variant='h4'  color='primary.dark'>Ayuda</Typography>
              </ListItem>
              <ListItem><Link onClick={() => navigate('/preguntas-frecuentes')}>Preguntas frecuentes</Link></ListItem>
            </List>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", alignItems: "start", pr: 1 }}
          >
            <List>
              <ListItem>
                <Typography variant='h4'  color='primary.dark'>Siguenos</Typography>
              </ListItem>
              <ListItem><Link onClick={() => openUrl('https://tiktok.com')}>Tiktok</Link></ListItem>
              <ListItem><Link onClick={() => openUrl('https://instagram.com')}>Instagram</Link></ListItem>
              <ListItem><Link onClick={() => openUrl('https://facebook.com')}>Facebook</Link></ListItem>
            </List>
          </Grid>

        </Grid>
      </Container>
    </RootStyle>
  );
}

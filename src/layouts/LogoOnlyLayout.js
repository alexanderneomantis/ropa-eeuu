import { Link as RouterLink, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// mantenedorAdmin
import Logo from '../assets/km-horizontal-logo.svg';
import GlobalSnackbar from "../components/GlobalSnackbar";
import {Box} from "@mui/material";

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <RouterLink to="/">
          <GlobalSnackbar />
          <Box
            component='img'
            src={Logo}
          />
        </RouterLink>
      </HeaderStyle>
      <Outlet />
    </>
  );
}

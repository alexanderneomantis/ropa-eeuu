import {Box, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";

export default function BreadCrumb() {
  const {pathname} = useLocation()

  function formatPath(txt) {
    return txt.replace(/\b\w/g, c => c.toUpperCase()).replace('/', ' ').replace('/', ' / ').replaceAll('-', ' ')
  }
  return (
    <Box sx={{ backgroundColor: theme => theme.palette.secondary.main, p: 5, display: 'flex', justifyContent: 'center' }}>
      <Typography variant='h4'>Home / {formatPath(pathname)}</Typography>
    </Box>
  )
}

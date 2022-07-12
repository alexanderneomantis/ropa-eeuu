
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {forwardRef, useContext} from 'react';
import {AlertContext} from "../context/AlertContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function GlobalSnackbar() {
  const { alert, initAlert } = useContext(AlertContext)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    initAlert(false, 'success', '')
  }


  return (
    <Snackbar
      open={alert.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%', color: '#fff' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}


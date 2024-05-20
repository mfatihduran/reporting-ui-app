import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationBar = ({open, close, notification, duration=3600}) => {
    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{minWidth: 450, width: "100%"}} open={open} autoHideDuration={notification.disableDuration ? null:  duration} onClose={close}>
            <Alert onClose={close} severity= {notification.severity}>
                {notification.message}
            </Alert>
        </Snackbar>    
    );
}

export default NotificationBar;
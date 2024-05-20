import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const ConfirmationDialog = ({id, onAggree, onCancel, open, title, message, onClose}) => {
  
    return (
        <Dialog
            id={id}
            fullWidth={true}
            maxWidth="xs"
            open={open}
            onClose={onClose}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle><Typography variant="body2" fontWeight="bold">{title}</Typography></DialogTitle>
            <DialogContent><Typography variant="body2">{message}</Typography></DialogContent>
            <DialogActions>
                <Button size="small" variant="outlined" color="secondary" onClick={onCancel} sx={{ textTransform: "none", fontWeight: "bold" }}>Cancel</Button>
                <Button size="small" variant="contained" color="primary" onClick={onAggree} sx={{ textTransform: "none", fontWeight: "bold" }}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
   
};

export default ConfirmationDialog;
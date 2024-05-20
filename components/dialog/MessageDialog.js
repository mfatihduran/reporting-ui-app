
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const MessageDialog = ({open, title, message, onClose }) => {
    return (
        <Dialog
            id="message"
            fullWidth={true}
            maxWidth="xs"
            open={open}
            onClose={onClose}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle><Typography variant="body2" color="primary" fontWeight="bold">{title}</Typography></DialogTitle>
            <DialogContent><Typography variant="body2">{message}</Typography></DialogContent>
            <DialogActions>
                <Button size="small" variant="text" color="primary" onClick={onClose} sx={{fontWeight: "bold", textTransform: "none" }}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
   
};

export default MessageDialog;
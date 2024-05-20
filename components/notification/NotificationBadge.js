import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBadge = (props) => {
    return (
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Badge badgeContent={props.count} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    );
};

export default NotificationBadge;

import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Box,
  CardHeader
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import { authSliceActions } from '../../store/slices/AuthSlice';

import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import useHttp from '../../hooks/useHttp';
import { HttpStatusCode } from 'axios';
import MessageDialog from '../dialog/MessageDialog';
import NotificationBar from '../notification/NotificationBar';

const UserLogin = () => {  
  const nameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const {postOperation} = useHttp();
  const [messageDialog, setMessageDialog] = useState({open: false, message:""});
  const [notification, setNotification] = useState({message: "", severity: "", open: false});

  const loginHandler = async(event) => {
    event.preventDefault();
    postOperation({url: process.env.USER_LOGIN_URL, body: { username: nameRef.current.value, password: passwordRef.current.value }})
    .then(response => {
      if (response?.status === HttpStatusCode.Ok) {
        dispatch(authSliceActions.login(response.headers.get("Authorization")));
        router.replace("/");
      } else {
        // Setting a dummy token to demostarate login
        dispatch(authSliceActions.login("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXJjaGFudFVzZXJJZCI6MSwicm9sZSI6ImFkbWluIiwibWVyY2hhbnRJZCI6MSwic3ViTWVyYhhbnRJZHMiOltdLCJ0aW1lc3RhbXAiOjE0NDQzODk4ODB9.zPxVu4fky1uG2fO3X2RbxiI4otK_HG7M4MMTB298"));
        router.replace("/");
        // Normally  this sort of exception nees to be trown;
        //throw new Error("Login failed");
      }
    })
    .catch(err => {
      setNotification({open: true, severity: "error", message: err.message});
    });    
  }; 

  return (
    <div className="center">
      <Box >
        <NotificationBar open={notification.open} close={() => setNotification({...notification, open: false})} notification={notification} />
        <form onSubmit={(event) => loginHandler(event)}>
          <Card sx={{minWidth: 360}}>
            <Divider variant="middle"/>
            <CardContent>
              <Stack spacing={1}>
                <Typography sx={{ fontSize: 14 }} color="primary">
                  Please enter login details
                </Typography>
                <TextField
                  size="small"
                  required
                  id="outlined-name-input"
                  label="User Name"
                  inputRef={nameRef}
                />
                <TextField
                  size="small"
                  required
                  id="outlined-password-input"
                  inputRef={passwordRef}
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <Button type="submit" size="small" variant="contained" sx={{fontWeight: "bold"}} color="primary">
                  Continue
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </form>
        <MessageDialog open={messageDialog.open} title={messageDialog.title} message={messageDialog.message} onClose={() => setMessageDialog({...messageDialog, open: false })}/>
      </Box>
    </div>
    
  );
};

export default UserLogin;
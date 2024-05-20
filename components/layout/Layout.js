import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../../store/slices/AuthSlice";
import NotificationBar from "../notification/NotificationBar";
import UserLogin from "../user-login/UserLogin";
import Sidebar from "../sidebar/Sidebar";
import { HttpStatusCode } from "axios";

const Layout = (props) => {
    const authentication = useSelector((state) => state.authentication);
    const [notification, setNotification] = useState({
        message: "",
        severity: "",
        open: false,
    });
    const router = useRouter();
    const { postOperation } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authentication.isAuthenticated) {
            const token = localStorage.getItem("Authorization");
            const expirationTime = localStorage.getItem("ExpirationTime");
            const currentTime = new Date().getTime();

            if (token && expirationTime && parseInt(expirationTime) > currentTime) {
                dispatch(authSliceActions.login(token));

                if (router.route === "/login") {
                    router.push("/");
                }
            } else {
                postOperation({ url: process.env.USER_LOGIN_URL })
                .then((response) => {
                    if (response?.status === HttpStatusCode.Ok) {
                        dispatch(authSliceActions.login(token));
                    
                        if (router.route === "/login") {
                            router.push("/");
                        }
                    } else {
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    setNotification({
                        open: true,
                        severity: "error",
                        message: err.message,
                    });
                    router.push("/login");
                });
            }          
        }
    }, [router.route]);

    return (
        <Fragment>
        <NotificationBar
            open={notification.open}
            close={() => setNotification({ ...notification, open: false })}
            notification={notification}
        />
        {authentication.isAuthenticated ? <Sidebar {...props} /> : <UserLogin />}
        {/* {!authentication.isAuthenticated && <UserLogin />} */}
        {/* <main>{props.children}</main> */}
        </Fragment>
    );
};

export default Layout;

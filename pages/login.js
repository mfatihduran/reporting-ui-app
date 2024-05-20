
import { Fragment } from "react";
import UserLogin from "../components/user-login/UserLogin";

const LoginPage = () => {
  return (
    <Fragment>
      <div className="center">
        <UserLogin/>
      </div>
    </Fragment>
  );
}

export default LoginPage;
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUserAuth } from "../../hooks/userHook";
import Loader from "../Loader/Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useUserAuth();
  return (
    <>
      {user === undefined ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Loader color="#000" />
        </div>
      ) : (
        <Route
          {...rest}
          render={(props) =>
            user && user.role === "ADMIN" ? (
              <Component {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      )}
    </>
  );
};

export default PrivateRoute;

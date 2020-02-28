import React from "react";
import { Route, Redirect } from "react-router-dom";
import BubblePage from "./BubblePage";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={props => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to='/Login' />;
        }
      }}
    />
  );
};
export default PrivateRoute;

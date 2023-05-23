import React, { useContext } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import UserContext from "../UserComponents/UserContext";

const PrivateRoutes = () => {
  const { authUser } = useContext(UserContext);
  const location = useLocation();
  const validToken = localStorage.getItem("token");

  return validToken || authUser ? <Outlet /> : <Navigate to="/auth/login" replace state={{ path: location.pathname }}></Navigate>

};

export default PrivateRoutes;

// Checks if auth user is trying to access the route (outlet). If not, navigated to login.  Once logged in, if there original URL was valid, it will redirect user there.

// https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c
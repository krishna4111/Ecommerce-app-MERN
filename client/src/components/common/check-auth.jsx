import React, { Children } from "react";
import { Navigate, useLocation } from "react-router-dom";

// In here the children prop is the component that we have to render.

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  console.log("entered into check auth");

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/shop/home" />;
  }
  if (
    isAuthenticated &&
    location.pathname.includes("admin") &&
    user.role !== "admin"
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    location.pathname.includes("shop") &&
    user.role === "admin"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <>{children}</>;
};

export default CheckAuth;

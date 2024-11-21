// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const data = localStorage.getItem("authToken");
  return data ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

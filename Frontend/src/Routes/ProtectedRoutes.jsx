import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoutes({ user, element }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to={"/"} replace />;
  try {
    const decode = jwtDecode(token);
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      if (storedUser !== decode.id) {
        return <Navigate to={"/"} replace />;
      }
    }
    else if (decode.id !== user.id) {
      return <Navigate to={"/"} replace />;
    }
    return element;
  } catch (err) {
    // return <Navigate to={'/'} replace />
    console.log("User catch in");
  }
}

export default ProtectedRoutes;

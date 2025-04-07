import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../assets/Pages/login";

const ProtectedRoute = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  const checkAuth = () => {
    setAuth(localStorage.getItem("token"));
  };

  useEffect(() => {
    window.addEventListener("storage", checkAuth);
  }, []);
  return <>{auth ? <Outlet /> : <Login checkAuth={checkAuth} />}</>;
};

export default ProtectedRoute;

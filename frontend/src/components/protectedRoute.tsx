import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

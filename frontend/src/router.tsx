import { Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./assets/Pages/NotFound";
import SignUp from "./assets/Pages/signup";
import Login from "./assets/Pages/login";
import ProtectedRoute from "./components/protectedRoute";

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;

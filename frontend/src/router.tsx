import { Route, Routes } from "react-router-dom";
import App from "./App";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/signup";
import Login from "./Pages/login";
import ProtectedRoute from "./components/protectedRoute";

const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<App />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

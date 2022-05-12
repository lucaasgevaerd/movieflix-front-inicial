import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import NonExistentRoutes from "./NonExistentRoutes";
import Login from "./pages/Login";
import Movies from "./pages/Movies";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<PrivateRoute />}>
          <Route path="/movies" element={<Movies />} />
        </Route>
        <Route path="*" element={<NonExistentRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

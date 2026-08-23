import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/signup";
import ForgotPassword from "../pages/ForgotPassword";
import Feed from "../pages/feed";
import Courses from "../pages/courses";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Admin from "../pages/admin";

import { PrivateRoute } from "../components/PrivateRoute";
import { AdminRoute } from "../components/AdminRoute";

/*
 * Mapa de rotas da plataforma.
 *
 *  Públicas:       /  /login  /signup  /forgot-password
 *  Usuário logado: /feed  /courses  /profile  /profile/edit
 *  Administrador:  /admin/*
 */
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    <Route
      path="/feed"
      element={
        <PrivateRoute>
          <Feed />
        </PrivateRoute>
      }
    />
    <Route
      path="/courses"
      element={
        <PrivateRoute>
          <Courses />
        </PrivateRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
    <Route
      path="/profile/edit"
      element={
        <PrivateRoute>
          <EditProfile />
        </PrivateRoute>
      }
    />

    <Route
      path="/admin/*"
      element={
        <AdminRoute>
          <Admin />
        </AdminRoute>
      }
    />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export { AppRoutes };

import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

// Rotas administrativas: exige login E perfil de administrador.
// Um usuário comum que digitar /admin é devolvido ao feed.
const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!isAdmin) {
    return <Navigate to="/feed" replace />;
  }

  return children;
};

export { AdminRoute };

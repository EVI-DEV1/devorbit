import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

// Bloqueia páginas internas (feed, cursos, perfil) para quem não está logado.
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export { PrivateRoute };

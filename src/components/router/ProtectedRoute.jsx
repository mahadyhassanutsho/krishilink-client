import { useLocation, Navigate } from "react-router";

import { useAuth } from "../../providers/AuthProvider";
import AuthLoadingPage from "../../pages/AuthLoadingPage";

const ProtectedRoute = ({ children }) => {
  const { user, authIsReady } = useAuth();
  const { pathname } = useLocation();

  if (!authIsReady) {
    return <AuthLoadingPage />;
  }

  if (!user) {
    return <Navigate state={pathname} to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

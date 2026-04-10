import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/lib/store";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/connexion" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;

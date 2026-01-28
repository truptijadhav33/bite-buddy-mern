// utils/roleGuard.jsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export default function RoleGuard({ allowedRole, children }) {
  const { isAuthenticated, user, role, initialLoading } = useAppSelector((state) => state.auth);

  // 1. Wait for the API to finish checking the token
  if (initialLoading) {
    return null; // Or a small spinner
  }

  const currentRole = role || user?.role;

  // 2. Only redirect if we ARE NOT loading and STILL not authenticated
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Check role
  if (allowedRole && currentRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
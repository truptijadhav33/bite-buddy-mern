import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function RoleGuard({ allowedRole, children }) {
  const { isAuthenticated, role, initialLoading } = useAppSelector(
    (state) => state.auth
  );

  if (initialLoading) return null; // Wait for initial check

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

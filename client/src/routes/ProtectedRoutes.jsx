import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoutes({ allowedRoles }) {

  const { user, initialLoading, isAuthenticated } = useSelector((state) => state.auth);

 
  if (initialLoading) {
    return <div className="h-screen bg-black" />; 
  }

  if (!user && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />; // Or /unauthorized
  }

  return <Outlet />;
}
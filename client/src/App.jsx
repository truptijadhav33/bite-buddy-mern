import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadUser, setInitialLoading } from "./features/auth/authSlice";
import RoleGuard from "./shared/utils/roleGuard";
import LoadingScreen from "./shared/ui/LoadingScreen";
import { Toaster } from "react-hot-toast";

// Layouts
import AdminLayout from "./shared/layouts/AdminLayout";
import StaffLayout from "./shared/layouts/StaffLayout";
import CustomerLayout from "./shared/layouts/CustomerLayout";

// Components & Utils
import ProtectedRoutes from "./routes/ProtectedRoutes";

// Pages
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMenu from "./pages/admin/Menu";
import AdminOrders from "./pages/admin/Orders";
import AdminTables from "./pages/admin/Tables";
import AdminGallery from "./pages/admin/Gallery";
import StaffOrders from "./pages/staff/Orders";
import Kitchen from "./pages/staff/Kitchen";
import Profile from "./features/auth/components/Profile";
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import Home from "./pages/customer/Home";
import MenuList from "./pages/customer/Menu";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/MyOrders";
import Booking from "./pages/customer/Booking";
import StaffTables from "./pages/staff/Tables";
import StaffDashboard from "./pages/staff/Dashboard";
import Gallery from "./pages/customer/Gallery";
import Location from "./pages/customer/Location";

export default function App() {
  const dispatch = useAppDispatch();
  const { initialLoading, user } = useAppSelector((state) => state.auth); // Added 'user' here

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !user) {
      dispatch(loadUser());
    } else if (!token) {
      dispatch(setInitialLoading(false));
    }
  }, [dispatch, user]);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#262728",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
          success: {
            iconTheme: {
              primary: "#EAC157",
              secondary: "#000",
            },
          },
        }}
      />
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* CUSTOMER ROUTES */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<MenuList />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="location" element={<Location />} />

          {/* PROTECTED CUSTOMER ROUTES */}
          <Route
            element={
              <ProtectedRoutes allowedRoles={["customer", "admin", "staff"]} />
            }
          >
            {/* SHARED: Every logged in user can see their own Profile info */}
            <Route path="profile" element={<Profile />} />

            {/* CUSTOMER ONLY: The Dashboard with points/orders/stats */}
            <Route
              path="dashboard"
              element={
                <RoleGuard allowedRole="customer">
                  <CustomerDashboard />
                </RoleGuard>
              }
            />
            <Route path="cart" element={<Cart />} />
            <Route path="booking" element={<Booking />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <RoleGuard allowedRole="admin">
              <AdminLayout />
            </RoleGuard>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="tables" element={<AdminTables />} />
          <Route path="gallery" element={<AdminGallery />} />
        </Route>

        {/* STAFF ROUTES */}
        <Route
          path="/staff"
          element={
            <RoleGuard allowedRole="staff">
              <StaffLayout />
            </RoleGuard>
          }
        >
          <Route index element={<StaffDashboard />} />
          <Route path="orders" element={<StaffOrders />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="tables" element={<StaffTables />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

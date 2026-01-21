/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { loadUser, setInitialLoading } from "./slices/authSlice";
import RoleGuard from "./utils/roleGuard";
import LoadingScreen from "./components/ui/LoadingScreen";

// layouts
import AdminLayout from "./components/admin/AdminLayout";
import StaffLayout from "./components/staff/StaffLayout";
import CustomerLayout from "./components/customer/CustomerLayout";

// pages
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMenu from "./pages/admin/Menu";
import AdminOrders from "./pages/admin/Orders";
import AdminTables from "./pages/admin/Tables";
import AdminGallery from "./pages/admin/Gallery";
import StaffOrders from "./pages/staff/Orders";
import Kitchen from "./pages/staff/Kitchen";
import Home from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Orders";
import Booking from "./pages/customer/Booking";
import StaffTables from "./pages/staff/Tables";
import StaffDashboard from "./pages/staff/Dashboard";
import Gallery from "./pages/customer/Gallery";
import Location from "./pages/customer/Location";
import Register from "./pages/auth/Register";

export default function App() {
  const dispatch = useAppDispatch();
  const { role, initialLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loadUser());
    } else {
      dispatch(setInitialLoading(false));
    }
  }, [dispatch]);

  if (initialLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN */}
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

        {/* CUSTOMER */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="location" element={<Location />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="booking" element={<Booking />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

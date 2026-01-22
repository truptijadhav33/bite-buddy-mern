import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import Menu from "../pages/customer/Menu";
import MyOrders from "../pages/customer/MyOrders";
import CustomerDashboard from "../pages/customer/CustomerDashboard"; 

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes allowedRoles={["customer"]} />
        }
      >
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/my-orders"
          element={<MyOrders />}
        />
        <Route path="/dashboard" element={<CustomerDashboard/>}/>
      </Route>
    </Routes>
  );
}

import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";

import Orders from "../pages/staff/Orders";

export default function StaffRoutes() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes allowedRoles={["staff"]} />
        }
      >
        <Route
          path="/staff/orders"
          element={<Orders />}
        />
      </Route>
    </Routes>
  );
}

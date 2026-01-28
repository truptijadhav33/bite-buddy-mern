// AdminLayout.jsx
import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { FaChartPie, FaUtensils, FaReceipt, FaChair, FaImage, FaHouse } from "react-icons/fa6";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <FaChartPie />, end: true },
  { name: "View Website", path: "/", icon: <FaHouse /> },
  { name: "Menu", path: "/admin/menu", icon: <FaUtensils /> },
  { name: "Orders", path: "/admin/orders", icon: <FaReceipt /> },
  { name: "Tables", path: "/admin/tables", icon: <FaChair /> },
  { name: "Gallery", path: "/admin/gallery", icon: <FaImage /> },
];

export default function AdminLayout() {
  return (
    // DashboardLayout handles the Sidebar and the "Sign Out" button
    <DashboardLayout title="ADMIN" menuItems={menuItems}>
      <div className="p-6 lg:p-10">
        <Outlet />
      </div>
    </DashboardLayout>
  );
}
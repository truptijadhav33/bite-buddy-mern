import DashboardLayout from "../common/DashboardLayout";
import { FaChartPie, FaUtensils, FaReceipt, FaChair, FaImage } from "react-icons/fa6";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <FaChartPie />, end: true },
  { name: "Menu", path: "/admin/menu", icon: <FaUtensils /> },
  { name: "Orders", path: "/admin/orders", icon: <FaReceipt /> },
  { name: "Tables", path: "/admin/tables", icon: <FaChair /> },
  { name: "Gallery", path: "/admin/gallery", icon: <FaImage /> },
];

export default function AdminLayout() {
  return <DashboardLayout title="Admin" menuItems={menuItems} footer="Admin Panel v1.0" />;
}

import DashboardLayout from "./DashboardLayout";
import { FaReceipt, FaKitchenSet, FaTable, FaChartLine } from "react-icons/fa6";

const staffMenu = [
  { name: "Dashboard", path: "/staff", icon: <FaChartLine />, end: true },
  { name: "Orders", path: "/staff/orders", icon: <FaReceipt /> },
  { name: "Kitchen", path: "/staff/kitchen", icon: <FaKitchenSet /> },
  { name: "Tables", path: "/staff/tables", icon: <FaTable /> },
];

export default function StaffLayout() {
  return <DashboardLayout title="Staff Panel" menuItems={staffMenu} />;
}

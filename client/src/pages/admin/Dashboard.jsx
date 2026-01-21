import StatCard from "../../components/admin/StatCard";
import OrdersTable from "../../components/admin/OrdersTableAdmin";
import { FaBox, FaMoneyBillWave, FaChair, FaClock } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="1,248"
          icon={<FaBox />}
          trend="+12% from last week"
        />
        <StatCard
          title="Revenue Today"
          value="₹42,300"
          icon={<FaMoneyBillWave />}
          trend="+8% from yesterday"
        />
        <StatCard
          title="Active Tables"
          value="12/20"
          icon={<FaChair />}
        />
        <StatCard
          title="Pending Orders"
          value="7"
          icon={<FaClock />}
          trend="Needs attention"
        />
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  );
}

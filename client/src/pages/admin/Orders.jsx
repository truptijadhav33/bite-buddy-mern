import OrdersTableAdmin from "../../components/admin/OrdersTableAdmin";

export default function Orders() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--primary)">Manage Orders</h1>

      {/* Orders Table with status updates */}
      <OrdersTableAdmin />
    </div>
  );
}

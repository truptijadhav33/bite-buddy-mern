import { useState } from "react";
import SharedOrdersTable from "../common/SharedOrdersTable";

const mockOrders = [
  { id: "#ORD001", table: 5, status: "Pending", amount: 850 },
  { id: "#ORD002", table: 2, status: "Completed", amount: 1200 },
  { id: "#ORD003", table: 8, status: "Preparing", amount: 640 },
  { id: "#ORD004", table: 1, status: "Pending", amount: 430 },
];

export default function OrdersTableAdmin() {
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <SharedOrdersTable
      title="Recent Orders"
      orders={orders}
      columns={["id", "table", "amount", "status"]}
      onStatusChange={handleStatusChange}
    />
  );
}

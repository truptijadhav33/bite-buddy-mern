const orders = [
  { id: "#ORD001", table: 5, status: "Pending", amount: 850 },
  { id: "#ORD002", table: 2, status: "Completed", amount: 1200 },
  { id: "#ORD003", table: 8, status: "Preparing", amount: 640 },
  { id: "#ORD004", table: 1, status: "Completed", amount: 430 },
];

const statusColors = {
  Pending: "bg-yellow-200 text-yellow-800",
  Preparing: "bg-blue-200 text-blue-800",
  Completed: "bg-green-200 text-green-800",
};

export default function OrdersTable() {
  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-[var(--primary)">Recent Orders</h3>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Order ID</th>
              <th className="p-2">Table</th>
              <th className="p-2">Status</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.table}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2">₹{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

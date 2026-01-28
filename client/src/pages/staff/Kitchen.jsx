import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOrders, updateOrderStatus } from "../../slices/orderSlice";
import KitchenTicket from "../../features/orders/components/KitchenTicket";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Kitchen() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleUpdateStatus = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "Preparing": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "Ready": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "Served": return "text-primary bg-primary/10 border-primary/20";
      default: return "";
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Filter for active kitchen orders (exclude Paid, Cancelled, and maybe Served)
  const activeOrders = orders.filter(o => ["Pending", "Preparing", "Ready"].includes(o.status));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Kitchen Display</h1>
          <p className="text-muted-foreground text-sm font-light">Real-time order management and preparation flow</p>
        </div>

        <div className="flex bg-[#161718] p-1 rounded-2xl border border-white/5">
          <div className="px-4 py-2 bg-primary text-black rounded-xl font-bold text-xs uppercase tracking-widest">Active Tickets</div>
          <div className="px-4 py-2 text-muted-foreground rounded-xl font-bold text-xs uppercase tracking-widest hover:text-white cursor-pointer transition-colors">History</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        {activeOrders.map((order) => (
          <KitchenTicket
            key={order._id}
            order={{
              ...order,
              id: order._id,
              table: order.table?.number || "??",
              time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              items: order.items.map(i => ({
                name: i.menuItem?.name || "Deleted Item",
                qty: i.quantity,
                instructions: i.instructions
              }))
            }}
            onUpdateStatus={handleUpdateStatus}
            getStatusColor={getStatusColor}
          />
        ))}

        {/* Empty Ticket Slot */}
        <div className="rounded-3xl border-2 border-dashed border-white/5 p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[300px]">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground">
            <FaArrowRightLong className="rotate-90" />
          </div>
          <div>
            <p className="text-sm font-bold text-muted-foreground">Waiting for Orders</p>
            <p className="text-[10px] text-muted-foreground/50 italic px-4">New tickets will appear here automatically</p>
          </div>
        </div>
      </div>
    </div>
  );
}

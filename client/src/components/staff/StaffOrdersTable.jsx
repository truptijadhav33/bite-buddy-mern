import { useState } from "react";
import Badge from "../ui/Badge";
import Input from "../ui/Input";
import { FaMagnifyingGlass, FaTable, FaChevronDown, FaChevronUp, FaUtensils } from "react-icons/fa6";
import CustomSelect from "../ui/CustomSelect";

const mockOrders = [
  {
    id: "#ORD001",
    table: 5,
    status: "Pending",
    amount: 550,
    date: "19 Jan, 19:30",
    items: [
      { name: "Garlic Bread", qty: 2, price: 150 },
      { name: "Spicy Chicken Wings", qty: 1, price: 280 }
    ]
  },
  {
    id: "#ORD002",
    table: 2,
    status: "Preparing",
    amount: 830,
    date: "19 Jan, 19:35",
    items: [
      { name: "Margherita Pizza Deluxe", qty: 2, price: 380 },
      { name: "Fresh Lime Soda", qty: 1, price: 70 }
    ]
  },
  {
    id: "#ORD003",
    table: 8,
    status: "Ready",
    amount: 450,
    date: "19 Jan, 19:40",
    items: [
      { name: "Truffle Pasta Alfredo", qty: 1, price: 450 }
    ]
  },
];

const statusColors = {
  Pending: "warning",
  Preparing: "info",
  Ready: "success",
  Completed: "default",
  Cancelled: "destructive",
};

export default function StaffOrdersTable() {
  const [orders, setOrders] = useState(mockOrders);
  const [expandedId, setExpandedId] = useState(null);
  const [tableSearch, setTableSearch] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = orders.filter(o =>
    tableSearch === "" || o.table.toString().includes(tableSearch) || o.id.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Orders</h1>
          <p className="text-muted-foreground text-sm">Manage incoming and active orders</p>
        </div>

        <div className="relative w-full md:w-80">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm" />
          <Input
            placeholder="Search by ID or Table..."
            className="pl-10 h-11 border-white/10 rounded-2xl"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-4 text-xs uppercase tracking-widest font-black text-muted-foreground">Order Info</th>
              <th className="p-4 text-xs uppercase tracking-widest font-black text-muted-foreground text-center">Table</th>
              <th className="p-4 text-xs uppercase tracking-widest font-black text-muted-foreground">Status</th>
              <th className="p-4 text-xs uppercase tracking-widest font-black text-muted-foreground text-right">Amount</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {filteredOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                isExpanded={expandedId === order.id}
                onToggleExpand={() => setExpandedId(expandedId === order.id ? null : order.id)}
                onStatusChange={handleStatusChange}
              />
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="p-20 text-center space-y-3">
            <p className="text-muted-foreground font-bold italic">No magic orders found in our scrolls...</p>
          </div>
        )}
      </div>
    </div>
  );
}

function OrderRow({ order, isExpanded, onToggleExpand, onStatusChange }) {
  return (
    <>
      <tr
        className={`group hover:bg-white/5 transition-colors cursor-pointer ${isExpanded ? 'bg-white/5' : ''}`}
        onClick={onToggleExpand}
      >
        <td className="p-4">
          <div className="flex flex-col">
            <span className="font-bold text-white group-hover:text-primary transition-colors">{order.id}</span>
            <span className="text-[10px] text-muted-foreground font-bold">{order.date}</span>
          </div>
        </td>
        <td className="p-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs">
            <FaTable className="text-primary text-[10px]" /> {order.table}
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <Badge variant={statusColors[order.status]}>{order.status}</Badge>
            <CustomSelect
              className="bg-transparent text-[10px] font-bold uppercase tracking-tight text-muted-foreground border-b border-white/10 focus:border-primary pb-1 cursor-pointer"
              value={order.status}
              onValueChange={(value) => onStatusChange(order.id, value)}
              options={Object.keys(statusColors).map((status) => ({
                value: status,
                label: status,
              }))}
            />

          </div>
        </td>
        <td className="p-4 text-right font-black text-primary">₹{order.amount}</td>
        <td className="p-4 text-center">
          {isExpanded ? <FaChevronUp className="text-muted-foreground" /> : <FaChevronDown className="text-muted-foreground" />}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-black/40 animate-in fade-in slide-in-from-top-1 duration-300">
          <td colSpan="5" className="p-6">
            <OrderDetails order={order} />
          </td>
        </tr>
      )}
    </>
  );
}

function OrderDetails({ order }) {
  return (
    <div className="bg-primary-foreground/5 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
          <FaUtensils /> Item Details
        </h4>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-black text-xs">{item.qty}x</span>
                <span className="text-sm font-bold text-white">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-muted-foreground">₹{item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full sm:w-64 space-y-4">
        <h4 className="text-xs font-black uppercase tracking-widest text-primary">Order Info</h4>
        <div className="p-4 rounded-xl border border-white/10 space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Estimated Time</p>
          <p className="text-sm font-bold text-white">15-20 Minutes</p>
        </div>
      </div>
    </div>
  );
}

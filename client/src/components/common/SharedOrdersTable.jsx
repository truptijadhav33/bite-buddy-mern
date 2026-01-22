import { useState } from "react";
import Badge from "../ui/Badge";
import CustomSelect from "../ui/CustomSelect";
import Input from "../ui/Input";

const statusColors = {
    Pending: "warning",
    Preparing: "info",
    Completed: "success",
    Cancelled: "destructive",
};

export default function SharedOrdersTable({
    orders = [], // Default to empty array
    onStatusChange,
    columns = ["id", "table", "status"],
    title = "Orders",
}) {
    const [filterStatus, setFilterStatus] = useState("All");
    const [tableSearch, setTableSearch] = useState("");

    const filteredOrders = orders.filter((o) => {
        // Handle both simple table numbers and nested table objects from backend
        const tableValue = typeof o.table === 'object' ? o.table?.number : o.table;
        const tableString = tableValue?.toString() || "";

        return (
            (filterStatus === "All" || o.status === filterStatus) &&
            (tableSearch === "" || tableString.includes(tableSearch))
        );
    });

    const statuses = ["All", "Pending", "Preparing", "Completed", "Cancelled"];

    return (
        <div className="rounded-xl border border-white/10 bg-[#1a1b1c] text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-white/5">
                <h3 className="text-xl font-bold tracking-tight text-white italic font-serif">
                    {title.split(' ')[0]}<span className="text-primary">{title.split(' ')[1] || ""}</span>
                </h3>

                <div className="flex items-center gap-4">
                    <div className="w-40">
                        <CustomSelect
                            value={filterStatus}
                            onValueChange={setFilterStatus}
                            placeholder="Filter Status"
                            options={statuses.map((s) => ({ value: s, label: s }))}
                        />
                    </div>

                    <Input
                        type="number"
                        placeholder="Table #"
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="w-32 bg-white/5 border-white/10 text-white"
                    />
                </div>
            </div>

            <div className="relative w-full overflow-auto">
                <table className="w-full text-sm">
                    <thead className="bg-white/5 border-b border-white/5">
                        <tr className="text-muted-foreground">
                            {columns.includes("id") && <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Order ID</th>}
                            {columns.includes("table") && <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Table</th>}
                            {columns.includes("items") && <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Items</th>}
                            {columns.includes("amount") && <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Amount</th>}
                            {columns.includes("status") && <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Status & Action</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredOrders.map((order) => {
                            // Backend uses _id, mock used id. We check for both.
                            const orderId = order._id || order.id;
                            const tableDisplay = typeof order.table === 'object' ? order.table?.number : order.table;

                            return (
                                <tr key={orderId} className="hover:bg-white/5 transition-colors group">
                                    {columns.includes("id") && (
                                        <td className="p-6 align-middle font-mono text-[10px] text-muted-foreground">
                                            {orderId.toString().slice(-6).toUpperCase()}
                                        </td>
                                    )}
                                    {columns.includes("table") && (
                                        <td className="p-6 align-middle font-bold text-white">T-{tableDisplay}</td>
                                    )}
                                    {columns.includes("items") && (
                                        <td className="p-6 align-middle text-muted-foreground">
                                            {order.items?.length || 0} Items
                                        </td>
                                    )}
                                    {columns.includes("amount") && (
                                        <td className="p-6 align-middle font-black text-primary italic">
                                            ₹{order.totalAmount || order.amount || 0}
                                        </td>
                                    )}
                                    {columns.includes("status") && (
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <Badge variant={statusColors[order.status] || "default"}>
                                                    {order.status}
                                                </Badge>
                                                {onStatusChange && (
                                                    <div className="w-32">
                                                        <CustomSelect
                                                            value={order.status}
                                                            onValueChange={(value) => onStatusChange(orderId, value)}
                                                            options={statuses.slice(1).map((s) => ({ value: s, label: s }))}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground italic">No orders match your filters.</div>
                )}
            </div>
        </div>
    );
}
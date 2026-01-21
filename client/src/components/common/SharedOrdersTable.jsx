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
    orders,
    onStatusChange,
    columns = ["id", "table", "status"],
    title = "Orders",
}) {
    const [filterStatus, setFilterStatus] = useState("All");
    const [tableSearch, setTableSearch] = useState("");

    const filteredOrders = orders.filter(
        (o) =>
            (filterStatus === "All" || o.status === filterStatus) &&
            (tableSearch === "" || o.table.toString().includes(tableSearch))
    );

    const statuses = ["All", "Pending", "Preparing", "Completed"];

    return (
        <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <div className="p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-semibold leading-none tracking-tight">
                    {title}
                </h3>

                <div className="flex items-center gap-4">
                    <CustomSelect
                        value={filterStatus}
                        onValueChange={setFilterStatus}
                        placeholder="Filter by status"
                        options={statuses.map((s) => ({ value: s, label: s }))}
                        className="w-40"
                    />


                    <Input
                        type="number"
                        placeholder="Search Table #"
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="w-40"
                    />
                </div>
            </div>

            <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b border-border">
                        <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                            {columns.includes("id") && (
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Order ID
                                </th>
                            )}
                            {columns.includes("table") && (
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Table
                                </th>
                            )}
                            {columns.includes("items") && (
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Items
                                </th>
                            )}
                            {columns.includes("amount") && (
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Amount
                                </th>
                            )}
                            {columns.includes("status") && (
                                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                    Status
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {filteredOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                            >
                                {columns.includes("id") && (
                                    <td className="p-4 align-middle font-medium">{order.id}</td>
                                )}
                                {columns.includes("table") && (
                                    <td className="p-4 align-middle">{order.table}</td>
                                )}
                                {columns.includes("items") && (
                                    <td className="p-4 align-middle">{order.items || "-"}</td>
                                )}
                                {columns.includes("amount") && (
                                    <td className="p-4 align-middle">
                                        {order.amount ? `₹${order.amount}` : "-"}
                                    </td>
                                )}
                                {columns.includes("status") && (
                                    <td className="p-4 align-middle flex items-center gap-4">
                                        <Badge variant={statusColors[order.status] || "default"}>
                                            {order.status}
                                        </Badge>
                                        {onStatusChange && (
                                            <CustomSelect
                                                value={order.status}
                                                onValueChange={(value) => onStatusChange(order.id, value)}
                                                options={statuses.slice(1).map((s) => ({ value: s, label: s }))}
                                                className="h-8 w-32 text-xs"
                                            />

                                        )}
                                    </td>

                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="p-8 text-center text-muted">No orders found.</div>
                )}
            </div>
        </div>
    );
}

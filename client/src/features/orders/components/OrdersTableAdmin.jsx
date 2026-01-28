import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOrders, updateOrderStatus } from "../../orders/orderSlice"; // Ensure these names match your slice
import SharedOrdersTable from "./SharedOrdersTable";
import toast from "react-hot-toast";

export default function OrdersTableAdmin() {
    const dispatch = useAppDispatch();

    const { items: orders = [], loading } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            // unwrap() allows us to use try/catch with Redux Thunks
            await dispatch(updateOrderStatus({ id, status: newStatus })).unwrap();
            toast.success(`Order ${id} marked as ${newStatus}`);
        } catch (err) {
            toast.error(err || "Failed to update order status");
        }
    };

    return (
        <div className="relative">
            {loading && orders.length === 0 && (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                </div>
            )}

            <SharedOrdersTable
                title="Live Orders Management"
                orders={orders}
                columns={["id", "table", "amount", "status"]}
                onStatusChange={handleStatusChange}
            />

            {!loading && orders.length === 0 && (
                <div className="text-center py-10 text-muted-foreground italic">
                    No active orders found.
                </div>
            )}
        </div>
    );
}

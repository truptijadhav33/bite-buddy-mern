import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTables, updateTable } from "../../slices/tableSlice";
import TableCard from "../../components/staff/TableCard";

const statusStyles = {
    Available: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Occupied: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Reserved: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    Cleaning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

export default function StaffTables() {
    const dispatch = useAppDispatch();
    const { tables, loading } = useAppSelector((state) => state.tables);

    useEffect(() => {
        dispatch(fetchTables());
    }, [dispatch]);

    const handleUpdateTable = (id, updates) => {
        dispatch(updateTable({ id, tableData: updates }));
    };

    if (loading && tables.length === 0) {
        return (
            <div className="flex justify-center items-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Floor Plan</h1>
                    <p className="text-muted-foreground text-sm">Monitor and manage table occupancy</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {Object.keys(statusStyles).map(status => (
                        <div key={status} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                            <div className={`w-2 h-2 rounded-full ${statusStyles[status].split(' ')[1]}`} />
                            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{status}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tables.map((table) => (
                    <TableCard
                        key={table._id}
                        table={{
                            ...table,
                            id: table._id,
                            startTime: table.startTime ? new Date(table.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
                        }}
                        statusStyles={statusStyles}
                        onUpdateTable={handleUpdateTable}
                    />
                ))}
            </div>
        </div>
    );
}

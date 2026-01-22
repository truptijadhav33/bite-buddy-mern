import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTables, updateTable } from "../../slices/tableSlice";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import toast from "react-hot-toast"; // Import toast

export default function TablesManagement() {
  const dispatch = useAppDispatch();
  
  // 1. Safety fallback: default tables to an empty array []
  const { tables = [], loading } = useAppSelector((state) => state.tables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const toggleAvailability = async (id, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "Occupied" : "Available";
    
    // 2. Use toast.promise for a great UX during the update
    const updatePromise = dispatch(updateTable({ id, tableData: { status: newStatus } })).unwrap();

    toast.promise(updatePromise, {
      loading: 'Updating table...',
      success: `Table marked as ${newStatus}`,
      error: 'Failed to update table status',
    });
  };

  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm border-white/10 overflow-hidden">
      <div className="p-6 border-b border-white/10 bg-white/5">
        <h3 className="text-xl font-bold tracking-tight text-white italic font-serif">
          Table<span className="text-primary">Management</span>
        </h3>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-muted-foreground">
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Table No.</th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Capacity</th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Status</th>
              <th className="h-12 px-6 text-right align-middle font-black uppercase tracking-widest text-[10px]">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {/* 3. Use optional chaining ?. to prevent mapping over undefined */}
            {tables?.map((t) => (
              <tr key={t._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-6 align-middle font-bold text-white group-hover:text-primary transition-colors">{t.number}</td>
                <td className="p-6 align-middle text-muted-foreground">{t.capacity} Persons</td>
                <td className="p-6 align-middle">
                  <Badge className={t.status === "Available" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}>
                    {t.status}
                  </Badge>
                </td>
                <td className="p-6 align-middle text-right">
                  <Button
                    size="sm"
                    className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black font-black uppercase tracking-widest text-[10px] h-8"
                    onClick={() => toggleAvailability(t._id, t.status)}
                    disabled={loading} // Disable button while updating
                  >
                    Toggle Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 4. Display loading spinner or empty message */}
        {loading && tables.length === 0 && (
            <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
            </div>
        )}

        {tables?.length === 0 && !loading && (
          <div className="py-20 text-center text-muted-foreground italic">
            No tables found. Please check your seeder.
          </div>
        )}
      </div>
    </div>
  );
}
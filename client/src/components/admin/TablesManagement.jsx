import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchTables, updateTable } from "../../slices/tableSlice";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function TablesManagement() {
  const dispatch = useAppDispatch();
  const { tables, loading } = useAppSelector((state) => state.tables);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const toggleAvailability = (id, currentStatus) => {
    const newStatus = currentStatus === "Available" ? "Occupied" : "Available";
    dispatch(updateTable({ id, tableData: { status: newStatus } }));
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
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">
                Table No.
              </th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">
                Capacity
              </th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">
                Status
              </th>
              <th className="h-12 px-6 text-right align-middle font-black uppercase tracking-widest text-[10px]">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {tables.map((t) => (
              <tr
                key={t._id}
                className="hover:bg-white/5 transition-colors group"
              >
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
                  >
                    Toggle Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tables.length === 0 && !loading && (
          <div className="py-20 text-center text-muted-foreground italic">
            No tables found. Please check your seeder.
          </div>
        )}
      </div>
    </div>
  );
}

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { FaTable, FaClock, FaUserGroup } from "react-icons/fa6";

export default function TableCard({ table, statusStyles, onToggleStatus, onUpdateTable }) {
    return (
        <div
            className={`group relative p-6 rounded-3xl border transition-all duration-300 hover:scale-[1.02]
        ${table.status === 'Occupied' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-[#161718] border-white/5'}
      `}
        >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl
            ${statusStyles[table.status]?.split(' ')[1]} bg-white/5 border border-white/10
          `}>
                        <FaTable />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white">{table.number}</h3>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                            <FaUserGroup /> {table.capacity} Seater
                        </div>
                    </div>
                </div>
                <Badge className={`${statusStyles[table.status]} border rounded-full px-3 py-0.5 text-[10px]`}>
                    {table.status}
                </Badge>
            </div>

            {table.startTime && (
                <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-2 rounded-xl border border-white/5">
                    <FaClock className="text-primary" />
                    Seated since <span className="text-white font-bold">{table.startTime}</span>
                </div>
            )}

            {table.status === "Available" && (
                <Button
                    variant="primary" size="sm" className="w-full rounded-xl text-xs h-10 font-bold"
                    onClick={() => onUpdateTable(table.id, {
                        status: "Occupied",
                        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    })}
                >
                    Mark Occupied
                </Button>
            )}

            {table.status === "Occupied" && (
                <Button
                    variant="outline" size="sm" className="w-full rounded-xl border-white/10 hover:bg-white/5 text-xs h-10"
                    onClick={() => onUpdateTable(table.id, { status: "Cleaning", startTime: null })}
                >
                    Mark for Cleaning
                </Button>
            )}

            {table.status === "Cleaning" && (
                <Button
                    variant="outline" size="sm" className="w-full rounded-xl border-white/10 hover:bg-white/5 text-xs h-10"
                    onClick={() => onUpdateTable(table.id, { status: "Available" })}
                >
                    Mark Available
                </Button>
            )}

            {table.status === "Reserved" && (
                <Button
                    variant="primary" size="sm" className="w-full rounded-xl text-xs h-10 font-bold"
                    onClick={() => onUpdateTable(table.id, {
                        status: "Occupied",
                        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    })}
                >
                    Check In Guests
                </Button>
            )}
        </div>
    );
}

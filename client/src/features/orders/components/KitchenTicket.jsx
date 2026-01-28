import Button from "../../../shared/ui/Button";
import { FaClock, FaFireBurner, FaCircleCheck } from "react-icons/fa6";

export default function KitchenTicket({ order, onUpdateStatus, getStatusColor }) {
    return (
        <div
            className={`flex flex-col rounded-3xl overflow-hidden border transition-all duration-500 h-full
        ${order.status === "Preparing" ? "border-blue-500/30 bg-blue-500/5 shadow-[0_0_30px_rgba(59,130,246,0.1)]" : "border-white/5 bg-[#161718]"}
      `}
        >
            {/* Ticket Header */}
            <div className={`p-4 flex items-center justify-between border-b
        ${order.status === "Preparing" ? "bg-blue-500/10 border-blue-500/10" : "bg-white/5 border-white/5"}
      `}>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-white">#{order.table}</span>
                    <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-bold">{order.id}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase">
                    <FaClock className="text-primary" /> {order.time}
                </div>
            </div>

            {/* Ticket Content */}
            <div className="flex-1 p-5 space-y-4">
                <div className="space-y-3">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-3 group/item">
                            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-primary border border-white/10 group-hover/item:bg-primary group-hover/item:text-black transition-colors">
                                {item.qty}
                            </span>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate group-hover/item:text-primary transition-colors">{item.name}</p>
                                {item.instructions && (
                                    <p className="text-[10px] text-orange-400 italic mt-0.5 leading-tight">Note: {item.instructions}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ticket Actions */}
            <div className="p-4 bg-black/20 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                        {order.status}
                    </span>
                </div>

                {order.status === "Pending" ? (
                    <Button
                        onClick={() => onUpdateStatus(order.id, "Preparing")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 h-10 rounded-xl text-xs font-black uppercase tracking-widest"
                    >
                        <FaFireBurner className="animate-pulse" /> Start Cooking
                    </Button>
                ) : (
                    <Button
                        onClick={() => onUpdateStatus(order.id, "Ready")}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-10 rounded-xl text-xs font-black uppercase tracking-widest"
                    >
                        <FaCircleCheck /> Mark Ready
                    </Button>
                )}
            </div>
        </div>
    );
}

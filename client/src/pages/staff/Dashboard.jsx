import { FaReceipt, FaKitchenSet, FaTable, FaClock, FaCircleCheck, FaFire } from "react-icons/fa6";
import StatCard from "../../shared/ui/StatCard";
import QuickLink from "../../shared/ui/QuickLink";

export default function StaffDashboard() {
    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-4xl font-bold text-white tracking-tight">Staff Overview</h1>
                <p className="text-muted-foreground text-sm font-light mt-1">Quick summary of today's operations</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={<FaReceipt />} label="Total Orders" value="24" color="text-primary" />
                <StatCard icon={<FaFire />} label="Active in Kitchen" value="5" color="text-blue-500" />
                <StatCard icon={<FaCircleCheck />} label="Ready to Serve" value="3" color="text-emerald-500" />
                <StatCard icon={<FaTable />} label="Tables Occupied" value="8/12" color="text-orange-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Access */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-white">Quick Access</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <QuickLink
                            to="/staff/kitchen"
                            icon={<FaKitchenSet />}
                            title="Kitchen Display"
                            desc="View incoming orders and manage preparation."
                            color="bg-orange-500/20 text-orange-500 border-orange-500/20"
                        />
                        <QuickLink
                            to="/staff/tables"
                            icon={<FaTable />}
                            title="Table Status"
                            desc="Update occupancy and manage floor plan."
                            color="bg-blue-500/20 text-blue-500 border-blue-500/20"
                        />
                    </div>
                </div>

                {/* Recent Activity Mini-List */}
                <div className="bg-[#161718] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
                    <h2 className="text-xl font-bold text-white flex items-center justify-between">
                        Recent Activity
                        <FaClock className="text-muted-foreground text-sm" />
                    </h2>
                    <div className="space-y-4">
                        <ActivityItem time="2 mins ago" text="New order received: #ORD007 (Table 1)" />
                        <ActivityItem time="15 mins ago" text="Order #ORD005 is now 'Ready to Serve'" />
                        <ActivityItem time="22 mins ago" text="Table 5 status changed to 'Occupied'" />
                        <ActivityItem time="45 mins ago" text="Shift check-in: Staff #1023 (Chef)" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({ time, text }) {
    return (
        <div className="flex gap-4 group cursor-default">
            <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div className="flex-1 w-[1px] bg-white/5 group-last:bg-transparent" />
            </div>
            <div className="pb-4">
                <p className="text-xs text-muted-foreground font-bold">{time}</p>
                <p className="text-sm text-white/80 group-hover:text-white transition-colors">{text}</p>
            </div>
        </div>
    );
}

// src/pages/customer/CustomerDashboard.jsx
import { useAppSelector } from "../../app/hooks";
import StatCard from "../../components/ui/StatCard"; 
import { Heart, Clock, Star, Ticket } from "lucide-react";
import { FaUtensils } from "react-icons/fa6"; // For the promo card

export default function CustomerDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  
  const recentOrders = [
    { id: "#8821", item: "Truffle Pasta", status: "Out for Delivery", time: "2 mins ago" },
    { id: "#8790", item: "Margherita Pizza", status: "Delivered", time: "Yesterday" },
  ];

  return (
    <div className="container mx-auto px-4 pt-36 max-w-screen-xl min-h-[70vh] space-y-10 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white italic font-serif tracking-tighter">
            Welcome back, <span className="text-primary">{user?.name || "Guest"}</span>
          </h1>
          <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mt-2">
            What are we craving today?
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Kitchen is Open</span>
        </div>
      </div>

      {/* Customer Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value="12" icon={<Clock size={18}/>} />
        <StatCard title="Loyalty Points" value="450" icon={<Star size={18}/>} trend="up" trendValue="+50" />
        <StatCard title="Favorites" value="8" icon={<Heart size={18}/>} />
        <StatCard title="Available Offers" value="3" icon={<Ticket size={18}/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-white/50 px-2">Recent Orders</h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">{order.item[0]}</div>
                  <div>
                    <p className="font-bold text-white">{order.item}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">{order.id} • {order.time}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400" : "bg-primary/10 text-primary border border-primary/20"}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Card */}
        <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-b from-primary/20 to-black border border-primary/20 p-8 flex flex-col justify-end min-h-[300px]">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity"><FaUtensils size={80} /></div>
          <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-2">Weekend Special</p>
          <h4 className="text-2xl font-serif italic font-black text-white mb-4">Get 20% off on all Desserts</h4>
          <button className="w-full py-4 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform">Order Now</button>
        </div>
      </div>
    </div>
  );
}
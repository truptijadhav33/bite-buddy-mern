import { useAppSelector } from "../../app/hooks";

export default function Dashboard() {
  // 1. Pull real orders from Redux
  const { items: orders = [] } = useAppSelector((state) => state.orders);

  // 2. Calculate real-time analytics
  const totalOrders = orders.length;
  
  const pendingOrders = orders.filter(
    (o) => o.status === "Pending" || o.status === "Preparing"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.status === "Completed"
  ).length;

  const totalRevenue = orders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + (o.totalAmount || o.amount || 0), 0);

  // 3. Map to your UI structure
  const stats = [
    { title: "Total Orders", value: totalOrders, color: "secondary" },
    { title: "Active Kitchen", value: pendingOrders, color: "accent" },
    { title: "Served Today", value: completedOrders, color: "primary" },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "accent" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER SECTION WITH PROFILE */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black text-white italic font-serif">
            Executive<span className="text-primary">Summary</span>
          </h1>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
            Real-time restaurant performance
          </p>
        </div>

        {/* This places the "AD" view in the top right corner */}
        <UserBadge />

        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col hover:border-primary/30 transition-all group"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">
              {stat.title}
            </p>
            <h2
              className={`mt-2 text-3xl font-black italic ${
                stat.color === "secondary"
                  ? "text-white"
                  : stat.color === "accent"
                  ? "text-primary"
                  : "text-primary"
              }`}
            >
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Analytics Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-xl h-80 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 mb-4 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
            <p className="text-muted-foreground font-medium">Revenue Trends</p>
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-tighter">Analytics engine connecting...</p>
        </div>
        
        <div className="bg-primary/5 border border-primary/10 p-8 rounded-xl flex flex-col justify-center">
            <h4 className="text-white font-bold mb-2">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">
                Your most active table today is <span className="text-primary font-bold">Table #5</span>. 
                Consider assigning an extra server to that zone.
            </p>
        </div>
      </div>
    </div>
  );
}
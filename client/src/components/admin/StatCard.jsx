export default function StatCard({ title, value, icon, trend }) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#161718] p-6 shadow-xl transition-all hover:border-primary/20">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        {icon && <span className="text-muted-foreground text-xl">{icon}</span>}
      </div>
      <div className="flex items-baseline space-x-3">
        <h2 className="text-3xl font-bold text-white tracking-tight">{value}</h2>
        {trend && (
          <span className="text-emerald-400 font-medium text-sm flex items-center">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

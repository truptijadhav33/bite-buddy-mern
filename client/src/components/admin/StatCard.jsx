import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ title, value, icon, trend, trendValue }) {
  // Determine if the trend is positive or negative
  const isPositive = trend === "up";
  const isNegative = trend === "down";

  return (
    <div className="rounded-xl border border-white/5 bg-[#161718] p-6 shadow-xl transition-all hover:border-primary/20 hover:translate-y-[-2px] duration-300">
      <div className="flex items-center justify-between space-y-0 pb-3">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
          {title}
        </p>
        {icon && (
          <div className="p-2 rounded-lg bg-white/5 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline justify-between">
        <h2 className="text-3xl font-black text-white tracking-tight italic font-serif">
          {value}
        </h2>
        
        {trendValue && (
          <div className={`flex items-center gap-1 text-xs font-bold ${
            isPositive ? "text-emerald-400" : isNegative ? "text-red-400" : "text-muted-foreground"
          }`}>
            {isPositive && <TrendingUp size={14} />}
            {isNegative && <TrendingDown size={14} />}
            {trendValue}
          </div>
        )}
      </div>
      
      {/* Decorative progress bar background */}
      <div className="mt-4 h-[2px] w-full bg-white/5 overflow-hidden">
        <div 
          className="h-full bg-primary/40 rounded-full" 
          style={{ width: '40%' }} 
        />
      </div>
    </div>
  );
}
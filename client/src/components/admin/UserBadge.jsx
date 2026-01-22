// components/admin/UserBadge.jsx
import { useAppSelector } from "../../app/hooks";

export default function UserBadge() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-5 rounded-full shadow-xl">
      {/* Profile Initials Circle */}
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black font-black text-sm border border-white/10 shadow-[0_0_15px_rgba(234,193,87,0.3)]">
        {user?.name?.substring(0, 2).toUpperCase() || "AD"}
      </div>
      
      {/* User Info */}
      <div className="text-left leading-tight">
        <p className="text-[10px] font-black text-white uppercase tracking-wider">
          {user?.role === 'admin' ? 'Administrator' : 'Staff Member'}
        </p>
        <p className="text-[9px] text-muted-foreground font-bold tracking-tight">
          {user?.name || "Main Station"}
        </p>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaEnvelope, FaIdBadge, FaCalendarDay } from "react-icons/fa6";
import { logoutUser } from "../../auth/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await dispatch(logoutUser());
    navigate("/login");
  };
  const { user, loading } = useSelector((state) => state.auth);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white font-serif">
        Please log in to view your profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-black pt-40 pb-20 px-4">
      <div className="max-w-2xl mx-auto bg-[#161718] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative">
        {/* Decorative Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[100px]" />

        <div className="p-12 relative z-10 flex flex-col items-center">
          {/* Profile Header */}
          <div className="w-32 h-32 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary text-6xl mb-6 shadow-xl shadow-primary/5">
            <FaUserCircle />
          </div>

          <h1 className="text-4xl font-serif italic text-white mb-2 tracking-tighter">
            {user.name}
          </h1>
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">
            {user.role} Member
          </p>

          {/* User Info Grid */}
          <div className="w-full space-y-4">
            <InfoTile
              icon={<FaEnvelope />}
              label="Email Address"
              value={user.email}
            />
            <InfoTile
              icon={<FaIdBadge />}
              label="User ID"
              value={user?.name ? `@${user.name.toLowerCase()}` : "Loading..."}
            />
            <InfoTile
              icon={<FaCalendarDay />}
              label="Account Type"
              value={`${user.role} Status`}
            />
          </div>

          {/* <button className="mt-12 px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Edit Profile Settings
          </button> */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-12 px-10 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
          >
            {isLoggingOut ? "Logging out..." : "Logout Session"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all">
      <div className="text-2xl text-primary/60 group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

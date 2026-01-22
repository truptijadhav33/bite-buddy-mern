import { useState } from "react";
import { useNavigate, NavLink, Outlet , Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { logoutUser } from "../../slices/authSlice";
import { FaUtensils, FaRightFromBracket } from "react-icons/fa6";

export default function DashboardLayout({ title, menuItems }) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Pull real user data from Redux
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logoutUser());
      navigate("/login");
    }
  };

  // Helper to get initials (e.g., "John Doe" -> "JD")
  const getInitials = (name) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar remains same... */}
      <aside
        className={`flex flex-col border-r border-white/10 bg-[#0f0f0f] transition-all duration-500 ease-in-out sticky top-0 h-screen ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`h-20 flex items-center border-b border-white/10 px-6 cursor-pointer transition-all hover:bg-white/5 group ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {collapsed ? (
            <span className="text-2xl text-primary animate-pulse">
              <FaUtensils />
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <span className="text-2xl text-primary drop-shadow-[0_0_8px_rgba(234,193,87,0.4)]">
                <FaUtensils />
              </span>
              <span className="font-serif italic font-black text-xl tracking-tighter uppercase">
                {title}
              </span>
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group relative ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`text-xl transition-transform duration-300 group-hover:scale-110 ${
                      isActive
                        ? "drop-shadow-[0_0_5px_rgba(234,193,87,0.5)]"
                        : ""
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                      {item.name}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[2px_0_10px_rgba(234,193,87,0.5)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/20">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-4 w-full px-4 py-4 rounded-xl transition-all text-muted-foreground hover:bg-red-500/10 hover:text-red-400 group ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <span className="text-xl group-hover:rotate-12 transition-transform">
              <FaRightFromBracket />
            </span>
            {!collapsed && (
              <span className="text-xs font-black uppercase tracking-[0.2em]">
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        <header className="h-20 border-b border-white/5 bg-white/[0.01] flex items-center px-8 justify-end">
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                {user?.role}
              </p>
              <p className="text-[11px] text-muted-foreground font-bold">
                {user?.name}
              </p>
            </div>

            {/* Wrap the profile circle in a Link to the customer profile or home */}
            <Link
              to="/profile"
              title="View Customer Profile"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-yellow-600 p-[1px] hover:scale-110 transition-transform cursor-pointer shadow-[0_0_15px_rgba(234,193,87,0.3)]"
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-black text-xs text-white">
                {getInitials(user?.name)}
              </div>
            </Link>
          </div>
        </header>

        <div className="p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

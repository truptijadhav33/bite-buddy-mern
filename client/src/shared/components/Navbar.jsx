import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Home,
  CalendarCheck,
  Images,
  MapPin,
  UserPlus,
  Settings,
  ShieldCheck,
  UserCircle,
  LogOut,
  History,
  ShoppingCart,
  ChefHat,
} from "lucide-react";
import { logoutUser } from "../../features/auth/authSlice";
import useAuth from "../hooks/useAuth";
import useDisclosure from "../hooks/useDisclosure";
import useClickOutside from "../hooks/useClickOutside";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();

  // Use our professional Disclosure hook for the dropdown
  const { isOpen: showDropdown, onClose, onToggle } = useDisclosure(false);

  // Close the dropdown automatically when clicking outside
  const dropdownRef = useClickOutside(onClose);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    onClose();
    navigate("/login");
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex justify-center w-full px-4">
      <div className="bg-white/4 backdrop-blur-lg border border-white/10 rounded-full px-2 py-2 flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
        <div className="flex items-center">
          <NavLink
            to="/"
            icon={<Home size={20} />}
            active={location.pathname === "/"}
            label="Home"
          />
          <NavLink
            to="/menu"
            icon={<ChefHat size={20} />}
            active={location.pathname === "/menu"}
            label="Menu"
          />
          <NavLink
            to="/gallery"
            icon={<Images size={20} />}
            active={location.pathname === "/gallery"}
            label="Gallery"
          />
          <NavLink
            to="/location"
            icon={<MapPin size={20} />}
            active={location.pathname === "/location"}
            label="Visit"
          />

          {isAuthenticated && (
            <>
              <NavLink
                to="/orders"
                icon={<History size={20} />}
                active={location.pathname === "/orders"}
                label="Orders"
              />
              <NavLink
                to="/booking"
                icon={<CalendarCheck size={20} />}
                active={location.pathname === "/booking"}
                label="Book"
              />
              <NavLink
                to="/cart"
                icon={<ShoppingCart size={20} />}
                active={location.pathname === "/cart"}
                label="Cart"
              />
            </>
          )}
        </div>

        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-3" />

        <div className="relative pr-2" ref={dropdownRef}>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onToggle}
                className="group relative flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-all"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-amber-200 flex items-center justify-center text-black shadow-lg shadow-primary/20">
                  <UserCircle size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest hidden md:block">
                  Account
                </span>
              </button>

              {showDropdown && (
                <div
                  className="absolute top-14 right-0 w-56 bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-3 shadow-3xl animate-in fade-in slide-in-from-top-4 duration-300 z-[110]"
                >
                  <div className="px-4 py-3 mb-2 bg-white/5 rounded-2xl">
                    <p className="text-[9px] text-primary uppercase font-black tracking-[0.2em] mb-1">
                      Signed in as
                    </p>
                    <p className="text-white text-xs font-bold truncate italic font-serif">
                      {user.name}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <DropdownItem
                      to="/profile"
                      icon={<Settings size={14} />}
                      label="Settings"
                      onClick={onClose}
                    />

                    <DropdownItem
                      to={
                        user.role === "admin"
                          ? "/admin"
                          : user.role === "staff"
                            ? "/staff"
                            : "/dashboard"
                      }
                      icon={<ShieldCheck size={14} />}
                      label="Panel"
                      color="text-primary"
                      onClick={onClose}
                    />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2">
              <Link
                to="/login"
                className="text-[14px] font-black text-white/60 hover:text-primary uppercase tracking-[0.2em] transition-colors"
              >
                LogIn
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white hover:bg-white hover:text-primary px-5 py-2.5 rounded-full text-[14px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <UserPlus size={14} /> Join
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, active, label }) {
  return (
    <Link
      to={to}
      className={`relative group flex flex-col items-center justify-center w-16 h-14 transition-all duration-300 ${active ? "text-primary" : "hover:text-[#ffffff]"
        }`}
    >
      {active && (
        <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
      )}

      <div
        className={`relative z-10 transition-transform duration-300 ${active
            ? "opacity-100 scale-110"
            : "hover:opacity-100 group-hover:scale-110"
          }`}
      >
        {icon}
      </div>

      <span
        className={`text-[10px] mt-1 font-black uppercase tracking-widest transition-opacity duration-300 ${active ? "opacity-100" : "group-hover:opacity-100"
          }`}
      >
        {label}
      </span>

      {active && (
        <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
      )}
    </Link>
  );
}

function DropdownItem({ to, icon, label, onClick, color = "text-white/70" }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group ${color}`}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest">
        {label}
      </span>
    </Link>
  );
}

import { Outlet, Link, NavLink } from "react-router-dom";
import Footer from "./Footer";
import Toast from "./Toast";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { FaCartShopping, FaUtensils, FaHouse, FaReceipt, FaCalendarCheck, FaImages, FaMapLocationDot, FaRightToBracket, FaUserPlus, FaRightFromBracket, FaUserGear } from "react-icons/fa6";

export default function CustomerLayout() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-primary selection:text-black">
      {/* Floating Navbar Container */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-2">
        <nav className="flex items-center gap-1 bg-primary/5 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-2xl">
          <NavIcons to="/" icon={<FaHouse />} label="Home" />
          <NavIcons to="/menu" icon={<FaUtensils />} label="Menu" />
          <NavIcons to="/gallery" icon={<FaImages />} label="Gallery" />
          <NavIcons to="/location" icon={<FaMapLocationDot />} label="Visit" />
          <NavIcons to="/booking" icon={<FaCalendarCheck />} label="Book" />
          <NavIcons to="/orders" icon={<FaReceipt />} label="Orders" />
          <NavIcons to="/cart" icon={<FaCartShopping />} label="Cart" badge={cartCount} />

          <div className="w-px h-8 bg-white/10 mx-2" />

          {!isAuthenticated ? (
            <>
              <NavIcons to="/login" icon={<FaRightToBracket />} label="Login" />
              <NavIcons to="/register" icon={<FaUserPlus />} label="Join" />
            </>
          ) : (
            <>
              {role !== "customer" && (
                <NavIcons to={role === "admin" ? "/admin" : "/staff"} icon={<FaUserGear />} label="Panel" />
              )}
              <button
                onClick={handleLogout}
                className="relative flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-500 group text-muted-foreground hover:text-red-400"
              >
                <div className="absolute inset-0 rounded-full bg-red-500/0 transition-transform duration-500 scale-0 group-hover:scale-50 group-hover:bg-red-500/10" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xl transition-transform duration-500 group-hover:scale-110">
                    <FaRightFromBracket />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-tighter mt-1 leading-none">
                    Exit
                  </span>
                </div>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}

function NavIcons({ to, icon, label, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex flex-col items-center justify-center w-14 h-14 rounded-full transition-all duration-500 group
        ${isActive ? "text-white" : "text-muted-foreground hover:text-white"}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Background Circle */}
          <div className={`absolute inset-1 rounded-full bg-primary/80 transition-transform duration-500 scale-0 ${isActive ? "scale-100" : "group-hover:scale-50 group-hover:bg-white/5"}`} />

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <span className={`text-xl transition-transform duration-500 ${isActive ? "scale-110" : ""}`}>
                {icon}
              </span>
              {badge > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border border-black animate-in fade-in zoom-in duration-300">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter mt-1 leading-none">
              {label}
            </span>
          </div>

          {/* Mini Cart Preview (Only for Cart icon) */}
          {label === "Cart" && badge > 0 && (
            <div className="absolute top-full right-0 mt-4 w-64 bg-[#161718] border border-white/10 rounded-2xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] translate-y-2 group-hover:translate-y-0">
              <p className="text-xs font-bold text-white mb-2 uppercase tracking-widest text-primary">Your Cart Preview</p>
              <p className="text-xs text-muted-foreground">{badge} items added. Click to view full cart.</p>
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}

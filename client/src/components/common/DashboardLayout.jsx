import { useState } from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { FaUtensils, FaRightFromBracket } from "react-icons/fa6";

export default function DashboardLayout({ title, menuItems}) {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            dispatch(logout());
            navigate("/login");
        }
    };

    return (
        <div className="flex min-h-screen font-sans bg-black text-white">
            {/* Sidebar */}
            <aside
                className={`flex flex-col border-r border-border transition-all duration-300 ${collapsed ? "w-20" : "w-64"
                    }`}
            >
                {/* Header */}
                <div
                    onClick={() => setCollapsed(!collapsed)}
                    className={`h-16 flex items-center border-b border-border px-4 font-bold text-lg cursor-pointer transition-colors hover:bg-white/5 ${collapsed ? "justify-center" : "justify-between"
                        }`}
                >
                    {collapsed ? (
                        <span className="text-2xl text-[var(--color-primary)]"><FaUtensils /></span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <span className="text-2xl text-[var(--color-primary)]"><FaUtensils /></span> {title}
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                ${isActive
                                    ? "bg-white/10 text-[var(--color-primary)] font-semibold"
                                    : "text-muted hover:bg-white/5"
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            {!collapsed && <span>{item.name}</span>}
                        </NavLink>
                    ))}

                    <div className="pt-4 mt-4 border-t border-border">
                        <button
                            onClick={handleLogout}
                            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all text-muted hover:bg-red-500/10 hover:text-red-400 ${collapsed ? "justify-center" : ""
                                }`}
                        >
                            <span className="text-xl"><FaRightFromBracket /></span>
                            {!collapsed && <span className="font-medium">Logout</span>}
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

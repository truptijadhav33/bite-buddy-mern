import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import CustomerNavbar from "../components/Navbar";

export default function CustomerLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-primary selection:text-black">
      <CustomerNavbar />
      {/* Page Content */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toasts */}
      <Toast />
    </div>
  );
}

/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchOrders } from "../../slices/orderSlice";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

import { 
  FaBagShopping, 
  FaCheckDouble, 
  FaTruckFast, 
  FaUtensils, 
  FaClock, 
  FaBan 
} from "react-icons/fa6";

export default function MyOrders() {
    const dispatch = useAppDispatch();
    const { orders = [], loading, error } = useAppSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if (loading) return <LoadingSpinner />

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "Preparing": return "text-primary bg-primary/10 border-primary/20 animate-pulse";
      case "Out for Delivery": return "text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "Cancelled": return "text-red-400 bg-red-500/10 border-red-500/20";
      default: return "text-muted-foreground bg-white/5 border-white/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <FaCheckDouble />;
      case "Preparing": return <FaUtensils />;
      case "Out for Delivery": return <FaTruckFast />;
      case "Cancelled": return <FaBan />;
      default: return <FaClock />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pt-32 pb-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-serif italic font-black text-white tracking-tighter">
            Your <span className="text-primary">Orders</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.5em]">
            History of your culinary adventures
          </p>
        </div>
        <div className="hidden md:block">
            <div className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Total Experience</p>
                <p className="text-xl font-serif italic text-white">{orders.length} Past Orders</p>
            </div>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="group bg-gradient-to-br from-[#1a1b1c] to-[#161718] border border-white/5 rounded-[3rem] overflow-hidden hover:border-primary/30 transition-all duration-700 shadow-2xl"
            >
              <div className="p-8 md:p-12 space-y-10">
                {/* Top Bar: Order ID and Status */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                        <FaBagShopping size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">{order._id}</p>
                        <p className="text-sm text-white font-bold">
                          {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </div>
                </div>

                {/* Content: Items and Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    {/* Item Breakdown */}
                    <div className="lg:col-span-2 space-y-5 bg-black/20 p-8 rounded-[2rem] border border-white/5">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center group/item">
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-black text-primary/40">0{idx + 1}</span>
                                    <p className="text-sm font-bold text-white/90 group-hover/item:text-primary transition-colors">
                                        {item.name} <span className="text-muted-foreground text-[10px] ml-2 font-medium tracking-widest">QTY: {item.quantity}</span>
                                    </p>
                                </div>
                                <div className="h-px flex-1 border-t border-dashed border-white/10 mx-4 hidden sm:block" />
                                <p className="text-sm font-bold text-white">₹{item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    {/* Total Summary */}
                    <div className="text-center lg:text-right space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">Investment in Taste</p>
                        <p className="text-5xl font-serif italic font-black text-primary drop-shadow-2xl">₹{order.totalPrice}</p>
                        <div className="pt-4 flex justify-center lg:justify-end gap-2">
                            {[1, 2, 3].map(star => (
                                <div key={star} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer: Dynamic Message */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground italic">
                        {order.status === "Delivered" 
                          ? "We hope you enjoyed every bite of your selection." 
                          : "Our artisans are currently preparing your masterpiece."}
                    </p>
                    <button className="text-[9px] font-black uppercase tracking-[0.4em] text-white hover:text-primary transition-colors">
                        Download Invoice
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State with Luxury Flair */
        <div className="py-32 text-center bg-gradient-to-b from-white/[0.02] to-transparent border border-dashed border-white/10 rounded-[4rem]">
          <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/10">
            <FaBagShopping className="text-primary/40 text-3xl" />
          </div>
          <h3 className="text-3xl font-serif italic text-white mb-4">A Blank Canvas</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] max-w-xs mx-auto leading-relaxed">
            Your culinary journey hasn't begun yet. Visit our menu to start your first experience.
          </p>
          <button className="mt-10 px-10 py-4 bg-primary text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:scale-105 transition-all">
            Explore Menu
          </button>
        </div>
      )}
    </div>
  );
}

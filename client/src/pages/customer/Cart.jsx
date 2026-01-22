/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../slices/cartSlice";
import Button from "../../components/ui/Button";
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaCartShopping, FaUtensils, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get both cart items and user status
  const { items } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Authentication required to place an order.");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    // Proceed to checkout logic or payment gateway
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="w-24 h-24 bg-white/[0.03] border border-white/5 rounded-full flex items-center justify-center text-4xl text-primary/40 mx-auto shadow-2xl">
            <FaCartShopping />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-serif italic text-white tracking-tight">Your Cart is Empty</h2>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">
              Select your culinary masterpieces first
            </p>
          </div>
          <Link to="/menu" className="block pt-4">
            <Button className="rounded-2xl px-12 h-14 uppercase tracking-widest text-[10px] font-black">
              Explore Our Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-8 mb-12 gap-4">
        <div>
          <h1 className="text-5xl font-serif italic text-white tracking-tighter">Your <span className="text-primary">Selection</span></h1>
          <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] mt-2">Review your curated items</p>
        </div>
        <Button variant="ghost" onClick={() => dispatch(clearCart())} className="text-red-400 hover:bg-red-500/10 text-[10px] uppercase font-black tracking-widest">
          Empty Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-6 p-6 rounded-[2rem] bg-[#161718] border border-white/5 transition-all hover:border-primary/20"
            >
              {/* Icon/Image */}
              <div className="w-20 h-20 rounded-2xl bg-white/[0.02] flex items-center justify-center text-primary/40 text-2xl border border-white/5 group-hover:scale-105 transition-transform">
                <FaUtensils />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-bold text-white tracking-tight uppercase text-sm">{item.name}</h3>
                <p className="text-xs text-primary font-black mt-1">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/5">
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                  className="p-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <FaMinus size={10} />
                </button>
                <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  className="p-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <FaPlus size={10} />
                </button>
              </div>

              {/* Total Price */}
              <div className="text-right min-w-[80px]">
                <p className="text-sm font-black text-white italic font-serif">₹{item.price * item.quantity}</p>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-muted-foreground hover:text-red-500 transition-colors mt-2"
                >
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-b from-[#1a1b1c] to-[#161718] border border-white/5 rounded-[2.5rem] p-10 sticky top-32 space-y-8 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Bill Summary</h3>

            <div className="space-y-4">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-white">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                <span>Service Tax (5%)</span>
                <span className="text-white">₹{Math.round(totalAmount * 0.05)}</span>
              </div>
              
              <div className="h-px bg-white/5 my-4" />
              
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary">Total Amount</span>
                <span className="text-4xl font-serif italic font-black text-white leading-none">
                  ₹{totalAmount + Math.round(totalAmount * 0.05)}
                </span>
              </div>
            </div>

            <Button 
              onClick={handleCheckout}
              className="w-full h-16 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black shadow-2xl shadow-primary/20 gap-3 group"
            >
              {isAuthenticated ? "Complete Order" : "Login to Order"} 
              {isAuthenticated ? <FaArrowRight className="group-hover:translate-x-1 transition-transform" /> : <FaLock />}
            </Button>
            
            <p className="text-[9px] text-center text-muted-foreground uppercase tracking-widest leading-relaxed">
                By proceeding, you agree to our <br/> 
                <span className="text-white underline cursor-pointer">Terms of Service</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
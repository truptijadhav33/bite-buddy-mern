import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../../slices/cartSlice";
import Button from "../../components/ui/Button";
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaCartShopping, FaUtensils } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl">
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl text-muted-foreground border border-white/10 mx-auto">
            <FaCartShopping />
          </div>
          <h2 className="text-3xl font-bold text-white">Your Cart is Empty</h2>
          <p className="text-muted-foreground max-w-md">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/menu">
            <Button size="lg" className="rounded-full px-8">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-white mb-6">Shopping Cart</h1>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-[#161718] border border-white/5 transition-all hover:border-white/10"
              >
                {/* Image Placeholder */}
                <div className="w-20 h-20 rounded-lg bg-white/5 flex items-center justify-center text-primary/40 text-2xl border border-white/5 group-hover:border-primary/20 transition-all">
                  <FaUtensils />
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-lg text-white">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">₹{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>

                {/* Total & Remove */}
                <div className="flex items-center gap-6">
                  <span className="text-lg font-bold text-primary w-20 text-right">
                    ₹{item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="ghost" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Checkout Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#161718] border border-white/5 rounded-2xl p-6 sticky top-28 space-y-6">
            <h3 className="text-xl font-bold text-white">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span>₹{Math.round(totalAmount * 0.05)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-bold text-primary">
                <span>Total</span>
                <span>₹{totalAmount + Math.round(totalAmount * 0.05)}</span>
              </div>
            </div>

            <Button className="w-full h-12 text-lg gap-2">
              Proceed to Checkout <FaArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

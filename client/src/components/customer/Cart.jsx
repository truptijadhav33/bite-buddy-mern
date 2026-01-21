import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { removeFromCart, updateQuantity, clearCart } from "../../slices/cartSlice";

export default function Cart() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (

    <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <h3 className="text-xl font-semibold leading-none tracking-tight mb-4">Your Cart</h3>

        {items.length === 0 && <p className="text-sm text-muted-foreground">No items added yet.</p>}

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
                    }
                    className="w-16 h-8 text-xs px-2 border rounded"
                  />
                  <span className="text-xs text-muted-foreground">x ₹{item.price}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-semibold text-sm">₹{item.price * item.quantity}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-xs text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-lg">₹{total}</span>
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground text-destructive hover:text-destructive"
            >
              Clear Cart
            </button>
            <button className="w-full mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

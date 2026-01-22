import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchMenuItems,
  createMenuItem,
  deleteMenuItem,
  fetchCategories,
} from "../../slices/menuSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import CustomSelect from "../ui/CustomSelect";

export default function MenuTableAdmin() {
  const dispatch = useAppDispatch();
  const { items, categories=[], loading } = useAppSelector((state) => state.menu);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "", // Changed from 'image'
    description: "",
    veg: false,
    spicy: false,
  });
  const [customCat, setCustomCat] = useState("");

  useEffect(() => {
    dispatch(fetchMenuItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  const addItem = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...newItem,
      price: Number(newItem.price), // Ensure it's a number
      imagePublicId: "manual_url", // Provide a dummy value to satisfy Schema
    };

    // Basic Validation
    if (!newItem.name || !newItem.category || !newItem.price) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await dispatch(createMenuItem(dataToSend)).unwrap();
      toast.success("Item added!");

      // Reset form...
      setNewItem({
        name: "",
        category: "",
        price: "",
        imageUrl: "",
        description: "",
        veg: false,
        spicy: false,
      });
    } catch (err) {
      // This will now tell you EXACTLY what the backend didn't like
      toast.error(`Failed: ${err}`);
      console.log("Creation Error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        // .unwrap() allows you to catch the error if the thunk fails
        await dispatch(deleteMenuItem(id)).unwrap();
        toast.success("Item removed from menu");
      } catch (err) {
        toast.error(err || "Failed to delete item. Please try again.");
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="rounded-xl border border-white/10 text-card-foreground shadow-sm overflow-hidden bg-card">
      <div className="p-6 border-b border-white/10 bg-white/5">
        <h3 className="text-xl font-bold tracking-tight text-white italic font-serif">
          Menu<span className="text-primary">Management</span>
        </h3>
      </div>

      {/* Add New Item */}
      <div className="p-6 border-b border-white/10 bg-white/[0.02]">
        <form onSubmit={addItem} className="space-y-6">
          {/* Top Row: Name, Category, Price */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Dish Name</label>
              <Input
                placeholder="e.g. Truffle Pasta"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="border-white/10 text-white focus:border-primary/50"
              />
            </div>

            {/* Category Selection Logic */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category (Select or Type New)</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <CustomSelect
                    value={newItem.category}
                    onValueChange={(val) => {
                        setNewItem({ ...newItem, category: val });
                        setCustomCat(""); // Clear custom if selecting existing
                    }}
                    options={categories.map((cat) => ({ value: cat, label: cat }))}
                    placeholder="Existing..."
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="New Category..."
                    value={customCat}
                    onChange={(e) => {
                      setCustomCat(e.target.value);
                      setNewItem({ ...newItem, category: e.target.value });
                    }}
                    className="border-white/10 text-white focus:border-primary/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Price (₹)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="border-white/10 text-white focus:border-primary/50"
              />
            </div>
          </div>

          {/* Bottom Row: Description & Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Short Description</label>
              <Input
                placeholder="Describe the flavors..."
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="border-white/10 text-white focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
              <Input
                placeholder="https://..."
                value={newItem.imageUrl}
                onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                className="border-white/10 text-white focus:border-primary/50"
              />
            </div>
          </div>

          {/* Action Row: Checkboxes & Button */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-2 border-t border-white/5 mt-4">
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={newItem.veg}
                  onChange={(e) => setNewItem({ ...newItem, veg: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-emerald-400 transition-colors">Vegetarian</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={newItem.spicy}
                  onChange={(e) => setNewItem({ ...newItem, spicy: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-red-400 transition-colors">Extra Spicy</span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-[0.2em] px-10 py-6 rounded-xl shadow-lg transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Confirm & Add to Menu"}
            </Button>
          </div>
        </form>
      </div>

      {/* Menu Table */}
      <div className="relative w-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-muted-foreground">
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">
                Dish
              </th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">
                Category
              </th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">
                Price
              </th>
              <th className="h-12 px-6 text-right align-middle font-black uppercase tracking-widest text-[10px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="p-6 align-middle">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-light max-w-xs truncate">
                      {item.description}
                    </span>
                  </div>
                </td>
                <td className="p-6 align-middle">
                  <Badge className="bg-white/5 text-white border-white/10 font-bold uppercase tracking-tighter text-[10px]">
                    {typeof item.category === "object"
                      ? item.category.name
                      : item.category}
                  </Badge>
                </td>
                <td className="p-6 align-middle font-black text-primary italic">
                  ₹{item.price}
                </td>
                <td className="p-6 align-middle text-right">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-muted-foreground hover:text-red-500 font-black uppercase tracking-widest text-[10px] transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && !loading && (
          <div className="py-20 text-center text-muted-foreground italic">
            Your menu is empty. Start by adding your first creation above.
          </div>
        )}
      </div>
    </div>
  );
}

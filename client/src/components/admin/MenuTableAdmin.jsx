import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchMenuItems, fetchCategories, createMenuItem, deleteMenuItem } from "../../slices/menuSlice";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import CustomSelect from "../ui/CustomSelect";

export default function MenuTableAdmin() {
  const dispatch = useAppDispatch();
  const { items, categories, loading } = useAppSelector((state) => state.menu);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: "",
    veg: false,
    spicy: false
  });

  useEffect(() => {
    dispatch(fetchMenuItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.price || !newItem.description) return;
    dispatch(createMenuItem(newItem));
    setNewItem({ name: "", category: "", price: "", description: "", veg: true, spicy: false });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deleteMenuItem(id));
    }
  };

  return (
    <div className="rounded-xl border border-border text-card-foreground shadow-sm overflow-hidden border-white/10">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold tracking-tight text-white italic font-serif">
          Menu<span className="text-primary">Management</span>
        </h3>
      </div>

      {/* Add New Item */}
      <div className="p-6 border-b border-white/10">
        <form onSubmit={addItem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border-white/10 text-white focus:border-primary/50"
            />
            <CustomSelect
              value={newItem.category}
              onValueChange={(value) =>
                setNewItem({ ...newItem, category: value })
              }
              placeholder="Select Category"
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
            />

            <Input
              type="number"
              placeholder="Price (₹)"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="border-white/10 text-white focus:border-primary/50"
            />
          </div>
          <Input
            placeholder="Description (short summary of the dish)"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="border-white/10 text-white focus:border-primary/50"
          />
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={newItem.veg}
                onChange={(e) => setNewItem({ ...newItem, veg: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">Vegetarian</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={newItem.spicy}
                onChange={(e) => setNewItem({ ...newItem, spicy: e.target.checked })}
                className="w-4 h-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white transition-colors">Spicy</span>
            </label>
            <div className="flex-1" />
            <Button
              type="submit"
              className="bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-widest px-8 rounded-xl shadow-[0_0_15px_rgba(234,193,87,0.2)]"
            >
              Add to Menu
            </Button>
          </div>
        </form>
      </div>

      {/* Menu Table */}
      <div className="relative w-full overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5 border-b border-white/5">
            <tr className="text-muted-foreground">
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Dish</th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Category</th>
              <th className="h-12 px-6 text-left align-middle font-black uppercase tracking-widest text-[10px]">Price</th>
              <th className="h-12 px-6 text-right align-middle font-black uppercase tracking-widest text-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                <td className="p-6 align-middle">
                  <div className="flex flex-col">
                    <span className="font-bold text-white group-hover:text-primary transition-colors">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground font-light max-w-xs truncate">{item.description}</span>
                  </div>
                </td>
                <td className="p-6 align-middle">
                  <Badge className="bg-white/5 text-white border-white/10 font-bold uppercase tracking-tighter text-[10px]">
                    {typeof item.category === 'object' ? item.category.name : item.category}
                  </Badge>
                </td>
                <td className="p-6 align-middle font-black text-primary italic">₹{item.price}</td>
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

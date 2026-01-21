import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToCart } from "../../slices/cartSlice";
import { fetchMenuItems, fetchCategories } from "../../slices/menuSlice";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { showToast } from "./Toast";
import {
  FaCartPlus,
  FaMagnifyingGlass,
  FaBowlFood,
  FaUtensils,
  FaIceCream,
  FaGlassWater,
  FaPepperHot,
  FaLeaf
} from "react-icons/fa6";

export default function MenuList() {
  const dispatch = useAppDispatch();
  const { items, categories, loading } = useAppSelector((state) => state.menu);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchMenuItems());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredItems = items.filter((item) => {
    const itemCategoryName = typeof item.category === 'object' ? item.category.name : item.category;
    const matchesCategory = selectedCategory === "All" || itemCategoryName === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryList = ["All", ...categories.map(c => c.name)];

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header & Search */}
      <div className="flex flex-col items-center space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-serif italic">
            Chef's Creations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl font-light">
            Indulge in our carefully selected menu items, prepared with the finest ingredients and culinary passion.
          </p>
        </div>

        <div className="relative w-full max-w-lg">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
          <Input
            className="pl-12 h-14 bg-white/5 border-white/10 text-white placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/10 rounded-2xl text-lg shadow-2xl"
            placeholder="Search our specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-4">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all duration-500
              ${selectedCategory === cat
                ? "bg-primary text-black shadow-[0_0_20px_rgba(234,193,87,0.3)] scale-105"
                : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-white/10"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group relative flex items-start gap-6 p-6 rounded-3xl border border-white/5 bg-[#161718] hover:bg-[#1a1b1c] transition-all duration-500 hover:border-primary/20"
            >
              {/* Elegant Icon Placeholder */}
              <div className="hidden sm:block w-24 h-24 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={`${import.meta.env.VITE_API_URL}${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder-food.jpg";
                  }}
                />
              </div>


              {/* Item Details */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl text-white group-hover:text-primary transition-colors">{item.name}</h3>
                      {item.spicy && <FaPepperHot className="text-orange-500 text-sm" />}
                      {item.veg && <div className="w-3 h-3 border border-emerald-500 rounded-sm flex items-center justify-center p-[2px]"><div className="w-full h-full bg-emerald-500 rounded-full"></div></div>}
                    </div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                      {typeof item.category === 'object' ? item.category.name : item.category}
                    </p>
                  </div>
                  <span className="font-bold text-xl text-primary">₹{item.price}</span>
                </div>

                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2">
                  <Button
                    onClick={() => {
                      dispatch(addToCart(item));
                      showToast(`${item.name} added to cart!`);
                    }}
                    className="h-10 px-6 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black transition-all duration-500 gap-2 font-bold text-sm"
                  >
                    <FaCartPlus className="text-lg" />
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-xl text-muted-foreground">No culinary delights found for this search.</p>
          <Button variant="link" className="text-primary mt-2" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
            Show All Items
          </Button>
        </div>
      )}
    </div>
  );
}

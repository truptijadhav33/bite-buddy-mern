/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addToCart } from "../../orders/cartSlice";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import { showToast } from "../../../shared/components/Toast";
import {
  FaCartPlus,
  FaMagnifyingGlass,
  FaPepperHot,
} from "react-icons/fa6";

export default function MenuList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  // 1. Corrected handleAddToCart logic
  const handleAddToCartClick = (item) => {
    if (!user) {
      showToast("Please login to start your order", "error");
      navigate("/login");
      return;
    }
    dispatch(addToCart(item));
    showToast(`${item.name} added to cart!`);
  };

  const { items = [], categories = [], loading } = useAppSelector((state) => state.menu);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items?.filter((item) => {
    if (!item) return false;
    const itemCat = typeof item.category === 'object' ? item.category.name : item.category;
    const matchesCategory = selectedCategory === "All" || itemCat === selectedCategory;
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) || [];

  const categoryList = ["All", ...categories.map(c => typeof c === 'string' ? c : c.name)];

  if (loading && items.length === 0) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-32 space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* 1. Hero & Search Section */}
      <div className="flex flex-col items-center space-y-10 text-center pt-8">
        <div className="space-y-4">
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] block animate-bounce">
            Discover Excellence
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter font-serif italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
            Chef's <span className="text-primary">Creations</span>
          </h2>
          <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto font-medium leading-relaxed uppercase tracking-[0.2em] opacity-60">
            A symphony of flavors, prepared with the finest ingredients.
          </p>
        </div>

        <div className="relative w-full max-w-2xl group">
          <FaMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/50 group-focus-within:text-primary transition-colors text-xl z-20" />
          <Input
            className="relative pl-16 h-20 bg-white/[0.03] border-white/10 text-white focus:border-primary/50 rounded-3xl text-xl backdrop-blur-xl transition-all"
            placeholder="Search our specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Category Navigation (Fixed Horizontal Scroll Bug) */}
      <div className="flex overflow-x-auto flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 no-scrollbar px-2 pb-4 scroll-smooth snap-x">
        {categoryList.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap flex-shrink-0 px-10 py-4 rounded-2xl text-[10px] font-black tracking-[0.25em] uppercase transition-all duration-500 border snap-center
              ${selectedCategory === cat
                ? "bg-primary text-black border-primary shadow-[0_10px_40px_rgba(234,193,87,0.25)] scale-105 z-10"
                : "bg-white/5 border-white/5 text-muted-foreground hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Menu Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group relative flex flex-col sm:flex-row items-center sm:items-start gap-8 p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent hover:from-white/[0.08] transition-all duration-700 hover:border-primary/30 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative w-44 h-44 sm:w-36 sm:h-36 shrink-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-4 ring-black/50">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"; }}
                />
              </div>

              {/* Content Details */}
              <div className="flex-1 space-y-5 text-center sm:text-left z-10">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <h3 className="font-serif italic text-3xl text-white group-hover:text-primary transition-colors tracking-tight">
                        {item.name}
                      </h3>
                      {item.spicy && <FaPepperHot className="text-red-500 text-lg" />}
                    </div>
                    <p className="text-[10px] font-black text-primary/60 uppercase tracking-[0.3em]">
                      {typeof item.category === "object" ? item.category.name : item.category}
                    </p>
                  </div>
                  <span className="text-2xl font-black text-primary italic">₹{item.price}</span>
                </div>

                <p className="text-sm text-muted-foreground font-light italic opacity-80 line-clamp-2">
                  "{item.description || "A masterfully crafted dish featuring seasonal ingredients."}"
                </p>

                <div className="pt-2 flex justify-center sm:justify-start">
                  <Button
                    onClick={() => handleAddToCartClick(item)} // FIXED: Call function directly
                    className="h-14 px-10 rounded-2xl bg-white/5 hover:bg-primary text-white hover:text-black border border-white/10 hover:border-primary transition-all duration-500 gap-4 font-black text-[10px] uppercase tracking-[0.3em]"
                  >
                    <FaCartPlus className="text-xl" />
                    Add to Experience
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10">
          <p className="text-2xl font-serif italic text-muted-foreground">
            Our kitchen couldn't find a match for that request...
          </p>
          <Button
            variant="link"
            className="text-primary mt-6 uppercase font-black tracking-widest text-xs"
            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
          >
            Return to Full Menu
          </Button>
        </div>
      )}
    </div>
  );
}

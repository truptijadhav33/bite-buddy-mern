import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGalleryItems } from "../../slices/gallerySlice";
import { FaExpand, FaUtensils, FaCamera, FaChampagneGlasses } from "react-icons/fa6";

const categories = ["All", "Interior", "Food", "Events"];

export default function Gallery() {
    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state) => state.gallery);
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        dispatch(fetchGalleryItems());
    }, [dispatch]);

    const filteredImages = items.filter(img => activeTab === "All" || img.category === activeTab);

    if (loading && items.length === 0) {
        return (
            <div className="flex justify-center items-center py-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-32 pb-20 max-w-screen-xl">
            <div className="text-center space-y-4 mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Our Gallery</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto font-light lg:text-lg">
                    Take a visual journey through our restaurant's ambiance, culinary art, and special moments.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-8 py-2.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 border
              ${activeTab === cat
                                ? "bg-primary text-black border-primary shadow-[0_0_20px_rgba(234,193,87,0.3)] scale-105"
                                : "bg-white/5 border-white/10 text-muted-foreground hover:text-white hover:border-white/20"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((img) => (
                    <div
                        key={img._id}
                        className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#161718] border border-white/5 hover:border-primary/30 transition-all duration-500 cursor-zoom-in"
                    >
                        {/* Image */}
                        <img
                            src={img.image}
                            alt={img.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                        />

                        {/* Category Icon Backup */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-0 transition-opacity pointer-events-none">
                            <div className="text-6xl text-white/10">
                                {img.category === "Food" && <FaUtensils />}
                                {img.category === "Interior" && <FaCamera />}
                                {img.category === "Events" && <FaChampagneGlasses />}
                            </div>
                        </div>

                        {/* Overlay Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                            <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">{img.category}</span>
                                    <div className="h-[1px] w-8 bg-primary/50" />
                                </div>
                                <h3 className="text-2xl font-bold text-white leading-tight">{img.title}</h3>
                                <p className="text-xs text-muted-foreground font-light line-clamp-2">{img.description}</p>
                                <div className="pt-4 flex items-center gap-2 text-primary text-sm font-bold">
                                    <FaExpand className="text-xs" /> View Fullscreen
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filteredImages.length === 0 && (
                <div className="text-center py-20 text-muted-foreground italic">
                    No images found in this category.
                </div>
            )}
        </div>
    );
}

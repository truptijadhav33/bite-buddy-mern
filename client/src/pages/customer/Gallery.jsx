import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGalleryItems } from "../../slices/gallerySlice";
import { FaExpand, FaUtensils, FaCamera, FaChampagneGlasses, FaCircleExclamation } from "react-icons/fa6";

const categories = ["All", "Interior", "Food", "Events"];

export default function Gallery() {
    const dispatch = useAppDispatch();
    const { items = [], loading, error } = useAppSelector((state) => state.gallery);
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        dispatch(fetchGalleryItems());
    }, [dispatch]);

    const filteredImages = items?.filter(img => {
    if (activeTab === "All") return true;
    
    // Normalize both to lowercase and trim any accidental whitespace
    return img.category?.toLowerCase().trim() === activeTab.toLowerCase().trim();
}) || [];

    // 1. Loading State
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-60 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">Developing your view...</p>
            </div>
        );
    }

    // 2. Error State
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center py-60 text-center space-y-4">
                <FaCircleExclamation className="text-red-500/50 text-4xl" />
                <h2 className="text-white font-serif italic text-2xl">Visuals Unavailable</h2>
                <p className="text-muted-foreground text-xs uppercase tracking-widest max-w-xs mx-auto">
                    We're having trouble loading the gallery. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-32 pb-20 max-w-screen-xl animate-in fade-in duration-1000">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-7xl font-serif italic font-black text-white tracking-tighter">
                        Our <span className="text-primary">Gallery</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em]">
                        A visual journey through culinary art
                    </p>
                </div>
                <div className="h-px w-20 bg-primary/30 mx-auto" />
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-10 py-3 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 border
                      ${activeTab === cat
                                ? "bg-primary text-black border-primary shadow-[0_10px_30px_rgba(234,193,87,0.2)] -translate-y-1"
                                : "bg-white/[0.02] border-white/5 text-muted-foreground hover:text-white hover:border-white/20"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((img, index) => (
                    <div
                        key={img._id || index}
                        className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#161718] border border-white/5 hover:border-primary/40 transition-all duration-700 cursor-zoom-in"
                    >
                        {/* Image */}
                        <img
                            src={img.imageUrl}
                            alt={img.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-100"
                        />

                        {/* Overlay Icon (Appears when not hovered) */}
                        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
                            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/20 text-xl">
                                {img.category === "Food" && <FaUtensils />}
                                {img.category === "Interior" && <FaCamera />}
                                {img.category === "Events" && <FaChampagneGlasses />}
                            </div>
                        </div>

                        {/* Hover Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                            <div className="space-y-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] uppercase font-black tracking-[0.3em] text-primary">{img.category}</span>
                                    <div className="h-px flex-1 bg-primary/20" />
                                </div>
                                <h3 className="text-3xl font-serif italic text-white leading-tight">{img.title}</h3>
                                <p className="text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2">{img.description}</p>
                                
                                <div className="pt-6 flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest">
                                    <FaExpand size={12} /> View Full Detail
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredImages.length === 0 && (
                <div className="text-center py-32 rounded-[3rem] border border-dashed border-white/10">
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.5em]">
                        Nothing captured in this category yet
                    </p>
                </div>
            )}
        </div>
    );
}
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchGalleryItems } from "../../slices/gallerySlice";
import { 
    FaExpand, FaXmark, FaCircleExclamation, 
    FaArrowLeft, FaArrowRight, FaShareNodes 
} from "react-icons/fa6";
import toast from "react-hot-toast";

const categories = ["All", "Interior", "Food", "Events"];

export default function Gallery() {
    const dispatch = useAppDispatch();
    const { items = [], loading, error } = useAppSelector((state) => state.gallery);
    
    const [activeTab, setActiveTab] = useState("All");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        dispatch(fetchGalleryItems());
    }, [dispatch]);

    // Prevent background scrolling when Lightbox is open
    useEffect(() => {
        if (selectedImage) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0px";
        }
    }, [selectedImage]);

    // Filtering logic
    const filteredImages = items?.filter(img => {
        if (activeTab === "All") return true;
        return img.category?.toLowerCase().trim() === activeTab.toLowerCase().trim();
    }) || [];

    const showNext = (e) => {
        e?.stopPropagation();
        const currentIndex = filteredImages.findIndex(img => img._id === selectedImage._id);
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setSelectedImage(filteredImages[nextIndex]);
    };

    const showPrev = (e) => {
        e?.stopPropagation();
        const currentIndex = filteredImages.findIndex(img => img._id === selectedImage._id);
        const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        setSelectedImage(filteredImages[prevIndex]);
    };

    const handleShare = async (e, img) => {
        e.stopPropagation();
        const shareData = {
            title: `BiteBuddy - ${img.title}`,
            text: img.description,
            url: window.location.href, 
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
            }
        } catch (err) { console.error("Error sharing:", err); }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === "Escape") setSelectedImage(null);
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, filteredImages, showNext, showPrev]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center py-60 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground text-center">Developing your view...</p>
        </div>
    );

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredImages.map((img, index) => (
                    <div
                        key={img._id || index}
                        onClick={() => setSelectedImage(img)}
                        className="group relative aspect-square rounded-[2.5rem] overflow-hidden bg-[#161718] border border-white/5 hover:border-primary/40 transition-all duration-700 cursor-pointer"
                    >
                        {/* Image - Better default opacity */}
                        <img
                            src={img.imageUrl}
                            alt={img.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-30"
                        />

                        {/* Smart Overlay - Always shows Title/Category, reveals more on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8">
                            <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-[9px] uppercase font-black tracking-[0.3em] text-primary">
                                    {img.category}
                                </span>
                                <h3 className="text-2xl font-serif italic text-white leading-tight pb-2.5">
                                    {img.title}
                                </h3>
                                
                                {/* Hidden part that slides up */}
                                <div className="hidden group-hover:block transition-all duration-500 pt-2">
                                    <p className="text-[14px] text-primary-foreground block italic mb-4">
                                        {img.description}
                                    </p>
                                    <div className="h-px w-full bg-gradient-to-r from-primary/90 to-transparent" />
                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-2 text-primary text-[9px] font-black uppercase tracking-widest cursor-pointer">
                                            <FaExpand size={10} /> View Fullscreen
                                        </div>
                                        <button 
                                            onClick={(e) => handleShare(e, img)}
                                            className="text-primary-foreground hover:text-primary transition-colors"
                                        >
                                            <FaShareNodes size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- FULL SCREEN LIGHTBOX --- */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-xl p-10 md:p-30 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Navigation */}
                    <button onClick={showPrev} className="absolute left-4 md:left-10 z-[110] p-4 text-muted hover:text-primary transition-all">
                        <FaArrowLeft size={30} />
                    </button>
                    <button onClick={showNext} className="absolute right-4 md:right-10 z-[110] p-4 text-muted hover:text-primary transition-all">
                        <FaArrowRight size={30} />
                    </button>

                    {/* Close */}
                    <button className="absolute top-8 right-8 text-muted hover:text-primary z-[110] flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest">Close</span>
                        <FaXmark size={24} />
                    </button>

                    <div 
                        className="relative max-w-4xl w-full flex flex-col lg:flex-row gap-12 items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="w-full lg:w-3/5 aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
                            <img 
                                key={selectedImage._id}
                                src={selectedImage.imageUrl} 
                                className="w-full h-full object-cover animate-in fade-in zoom-in duration-500" 
                                alt={selectedImage.title} 
                            />
                        </div>

                        <div className="w-full lg:w-2/5 text-left space-y-8 animate-in slide-in-from-right-10 duration-700">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                                        {selectedImage.category}
                                    </span>
                                    <button 
                                        onClick={(e) => handleShare(e, selectedImage)}
                                        className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-[12px] font-black uppercase tracking-widest"
                                    >
                                        <FaShareNodes /> Share
                                    </button>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-none">
                                    {selectedImage.title}
                                </h2>
                            </div>
                            
                            <div className="h-px w-full bg-gradient-to-r from-primary/90 to-transparent" />
                            
                            <p className="text-lg text-muted-foreground leading-relaxed italic font-light">
                                "{selectedImage.description}"
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  FaBowlFood,
  FaTruckFast,
  FaUserTie,
  FaArrowRightLong,
  FaMapLocationDot,
  FaClock,
  FaUtensils,
  FaCamera,
  FaChampagneGlasses
} from "react-icons/fa6";

export default function Home() {
  useEffect(() => {
    document.title = "BiteBuddy | Culinary Artistry in Every Bite";
  }, []);

  return (
    <div className="flex flex-col bg-black animate-in fade-in duration-1000">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-[120px]">
        <div
          className="absolute inset-0 bg-cover object-contain bg-center opacity-60"
          style={{
            backgroundImage:
              'url("https://static.vecteezy.com/system/resources/thumbnails/046/760/455/small/assorted-fresh-herbs-and-spices-arranged-on-rustic-dark-stone-surface-photo.jpeg")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black" />

        <div className="relative z-10 max-w-4xl mx-auto px-2 space-y-10">

          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl rotate-12 shadow-[0_20px_50px_rgba(234,193,87,0.2)] mb-4">
             <FaUtensils className="text-black text-3xl -rotate-12" />
          </div>
            <h2 className="text-xl font-serif italic  text-white tracking-wider ">
              Bite<span className="text-primary">Buddy</span>
            </h2>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-serif italic  tracking-tighter text-white">
            Culinary <span className="text-primary">Artistry</span>
            <br />
            <span className="text-white/90">In Every Bite</span>
          </h1>

          <p className="mx-auto max-w-xl text-sm md:text-base text-muted-foreground tracking-[0.2em] opacity-80">
            Savor the finest organic ingredients, expertly crafted
            by master chefs in our culinary sanctuary.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/menu"
              className="px-12 py-5 rounded-2xl bg-primary text-white  text-[14px] uppercase tracking-[0.2em] hover:bg-primary/95 transition-all"
            >
              Order Now
            </Link>
            <Link
              to="/booking"
              className="px-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white  text-[14px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all backdrop-blur-md"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 border-y border-white/5">
        <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <FeatureCard icon={<FaBowlFood />} title="Organic Harvest" description="Sourced daily from local farms." />
          <FeatureCard icon={<FaTruckFast />} title="Swift Service" description="Perfect temperature, every time." />
          <FeatureCard icon={<FaUserTie />} title="Culinary Masters" description="Michelin-level expertise." />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-32 bg-[#161718]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl md:text-6xl italic text-white">
              Visual <span className="text-primary">Elegance</span>
            </h2>
            <Link to="/gallery" className="text-primary uppercase text-[10px]  tracking-widest flex items-center gap-3">
              View Gallery <FaArrowRightLong />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 h-[400px]">
            <PreviewBox icon={<FaUtensils />} label="Cuisine" />
            <PreviewBox icon={<FaCamera />} label="Interior" shift />
            <PreviewBox icon={<FaChampagneGlasses />} label="Events" />
            <PreviewBox icon={<FaBowlFood />} label="Process" shift />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Helpers ---------- */

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-[#161718] border border-white/5 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl text-primary mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-2xl font-serif italic text-white mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm uppercase tracking-wider opacity-60">
        {description}
      </p>
    </div>
  );
}

function PreviewBox({ icon, label, shift }) {
  return (
    <div className={`bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center group ${shift ? "translate-y-12" : ""}`}>
      <div className="text-3xl text-white/10 group-hover:text-primary transition-all flex flex-col items-center gap-3">
        {icon}
        <span className="text-[10px]  uppercase tracking-widest opacity-0 group-hover:opacity-100">
          {label}
        </span>
      </div>
    </div>
  );
}

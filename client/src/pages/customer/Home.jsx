import { Link } from "react-router-dom";
import {
  FaBowlFood,
  FaTruckFast,
  FaUserTie,
  FaArrowRightLong,
  FaMapLocationDot,
  FaClock,
  FaMapPin,
} from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden border-b border-border pt-28">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/046/760/455/small/assorted-fresh-herbs-and-spices-arranged-on-rustic-dark-stone-surface-photo.jpeg")`,
          }}
        />

        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative z-10 p-4 max-w-4xl mx-auto space-y-6">
          {/* <div className="inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-sm text-primary mb-4">
            ✨ Experience the Taste of Luxury
          </div> */}
          {/* Brand Identity */}
          <div className="flex flex-col items-center gap-2 mb-2">
            {/* Logo */}
            <div className="w-30 h-30 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.jpg"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Restaurant Name */}
            <h2 className="text-lg tracking-[0.4em] font-black text-primary">
              BiteBuddy
            </h2>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Culinary Excellence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
              On Your Plate
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Savor the finest ingredients, expertly crafted by our master chefs.
            From farm to table, we deliver an unforgettable dining experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/menu"
              className="px-8 py-3 rounded-full bg-primary text-secondary-foreground font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105"
            >
              Order Now
            </Link>
            <Link
              to="/booking"
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground">
              We strive for perfection in every dish we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FaBowlFood />}
              title="Fresh Ingredients"
              description="We work with local farmers to source the freshest organic ingredients daily."
            />
            <FeatureCard
              icon={<FaTruckFast />}
              title="Fast Delivery"
              description="Hot and fresh food delivered to your doorstep in under 30 minutes."
            />
            <FeatureCard
              icon={<FaUserTie />}
              title="Master Chefs"
              description="Our kitchen is led by world-renowned chefs with years of experience."
            />
          </div>
        </div>
      </section>

      {/* Sneak Peek (Gallery Preview) */}
      <section className="py-24 bg-[#161718]">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
                A Visual <span className="text-primary">Journey</span>
              </h2>
              <p className="text-muted-foreground max-w-xl font-light">
                Experience the ambiance and art before you even arrive.
              </p>
            </div>
            <Link
              to="/gallery"
              className="group flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm hover:gap-5 transition-all"
            >
              Explore Gallery <FaArrowRightLong />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-[2/1]">
            <div className="bg-white/5 rounded-3xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="bg-white/5 rounded-3xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative group translate-y-8">
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="bg-white/5 rounded-3xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative group">
              <div className="absolute inset-0 bg-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="bg-white/5 rounded-3xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer overflow-hidden relative group translate-y-8">
              <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us (Location Preview) */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 max-w-screen-xl relative z-10">
          <div className="rounded-[3rem] bg-gradient-to-br from-[#1a1b1c] to-black border border-white/10 p-12 md:p-20 overflow-hidden relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                    Find Us <br />{" "}
                    <span className="text-primary italic">Nearby</span>
                  </h2>
                  <p className="text-muted-foreground font-light text-lg">
                    Located in the heart of the city, we're just a short walk
                    away from anywhere.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg shrink-0">
                      <FaMapLocationDot />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                        Our Location
                      </p>
                      <p className="text-white font-bold text-sm">
                        123 Culinary Avenue, Food City, FC 90210
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg shrink-0">
                      <FaClock />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
                        Opening Hours
                      </p>
                      <p className="text-white font-bold text-sm">
                        Mon-Sun: 11:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <Link to="/location">
                  <button className="mt-8 px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm hover:border-primary hover:bg-black transition-all border hover:scale-105 active:scale-95">
                    Get Directions
                  </button>
                </Link>
              </div>

              <div className="relative aspect-square md:aspect-auto md:h-full rounded-[2.5rem] overflow-hidden border border-white/10 group">
                {/* Google Map */}
                <iframe
                  title="Hotel Destiny Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.397028521824!2d74.72244747404358!3d19.090230751527887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb1c262ae1ec3%3A0x52689a9d3eeeeab8!2sHotel%20Destiny!5e0!3m2!1sen!2sin!4v1768844456072!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0 brightness-70 saturate-170"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Dark gradient overlay (luxury effect) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Info card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#161718]/85 backdrop-blur-xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
                    Quick Note
                  </p>
                  <p className="text-xs text-muted-foreground italic font-light">
                    Valet parking & curbside pickup available.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl bg-[#161718] border border-white/5 hover:border-primary/20 transition-all group">
      <div className="text-4xl text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

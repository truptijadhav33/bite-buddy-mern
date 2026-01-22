import {
  FaMapPin,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaRoute,
  FaArrowRightLong,
} from "react-icons/fa6";
import Button from "../../components/ui/Button";

export default function Location() {
  return (
    <div className="container mx-auto px-4 pt-40 pb-20 max-w-screen-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Contact Info & Details */}
        <div className="space-y-16">
          <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl font-serif italic font-black text-white tracking-tighter leading-none">
                Visit our <br /> <span className="text-primary">Sanctuary</span>
                </h1>
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.4em] mt-4">
                    The heart of culinary excellence
                </p>
            </div>
            <p className="text-muted-foreground text-lg max-w-lg font-medium leading-relaxed">
              Nestled in the city's vibrant center, we offer a refined escape 
              where architectural elegance meets gastronomic art.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4">
            <ContactCard
              icon={<FaMapPin className="text-primary" />}
              title="Our Estate"
              detail="123 Culinary Avenue, Food City, FC 90210"
            />
            <ContactCard
              icon={<FaPhone className="text-primary" />}
              title="Reservations"
              detail="+1 (555) 123-4567"
            />
            <ContactCard
              icon={<FaEnvelope className="text-primary" />}
              title="Concierge"
              detail="hello@bitebuddy.com"
            />
            <ContactCard
              icon={<FaRoute className="text-primary" />}
              title="Arrival"
              detail="Complimentary valet parking at main entrance."
            />
          </div>

          {/* Opening Hours Card */}
          <div className="p-10 rounded-[3rem] bg-gradient-to-b from-[#1a1b1c] to-[#161718] border border-white/5 shadow-2xl space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <FaClock size={120} className="text-white group-hover:rotate-12 transition-transform duration-700" />
            </div>

            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white flex items-center gap-3">
               Weekly Hours
            </h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                <span className="text-muted-foreground">Mon - Thu</span>
                <span className="text-white">11:00 AM - 10:00 PM</span>
              </div>
              
              <div className="flex justify-between items-center text-xs uppercase tracking-[0.15em] p-4 bg-primary/10 rounded-2xl border border-primary/20">
                <span className="text-primary font-black italic">Fri - Sat</span>
                <span className="text-primary font-black">11:00 AM - 11:30 PM</span>
              </div>
              
              <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-white">10:30 AM - 10:00 PM</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 relative z-10">
              <Button
                as="a"
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl h-16 gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all"
              >
                Navigate via Google Maps <FaArrowRightLong />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative group lg:sticky lg:top-32">
          {/* Animated Glow behind the map */}
          <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative aspect-square lg:aspect-auto lg:h-[800px] w-full border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <iframe
              title="BiteBuddy Sanctuary Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1689876543210!5m2!1sen!2sus"
              className="w-full h-full grayscale invert contrast-125 opacity-70 hover:opacity-90 transition-opacity duration-700"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Dark vignette over the map */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            {/* Floating Info Tag */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full">
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary text-center">
                    Private Valet Parking Available
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, detail }) {
  return (
    <div className="space-y-3 group">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/[0.03] border border-white/5 rounded-lg group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
          {icon}
        </div>
        <h4 className="text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground/60">
          {title}
        </h4>
      </div>
      <p className="text-md text-white font-serif italic tracking-tight leading-relaxed max-w-[200px]">
        {detail}
      </p>
    </div>
  );
}
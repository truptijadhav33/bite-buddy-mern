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
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact info & Info */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
              Find <span className="text-primary italic">Us</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg font-light">
              Nestled in the heart of the city, we are easily accessible and
              ready to welcome you with a warm smile and great food.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <ContactCard
              icon={<FaMapPin className="text-primary" />}
              title="Our Address"
              detail="123 Culinary Avenue, Food City, FC 90210"
            />
            <ContactCard
              icon={<FaPhone className="text-primary" />}
              title="Phone"
              detail="+1 (555) 123-4567"
            />
            <ContactCard
              icon={<FaEnvelope className="text-primary" />}
              title="Email"
              detail="hello@restaurant.com"
            />
            <ContactCard
              icon={<FaRoute className="text-primary" />}
              title="Getting Here"
              detail="Valet parking available at the main entrance."
            />
          </div>

          <div className="p-8 rounded-[2rem] bg-[#161718] border border-white/5 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <FaClock className="text-primary" /> Opening Hours
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Mon - Thu</span>
                <span className="text-white font-bold">
                  11:00 AM - 10:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center text-sm p-3 bg-primary/10 rounded-xl border border-primary/20">
                <span className="text-primary font-bold">Fri - Sat</span>
                <span className="text-primary font-black">
                  11:00 AM - 11:30 PM
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-white font-bold">
                  10:30 AM - 10:00 PM
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-4">
                Ready to visit?
              </p>
              <Button
                as="a"
                href="https://www.google.com/maps/dir/?api=1&destination=19.090230751527887,74.72244747404358"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-2xl h-12 gap-2 text-sm font-black uppercase tracking-widest"
              >
                Get Direction on Google Maps <FaArrowRightLong />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="relative aspect-square lg:aspect-auto lg:h-[700px] w-full border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="relative aspect-square lg:aspect-auto lg:h-[700px] w-full border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <iframe
                title="Hotel Destiny Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.397028521824!2d74.72244747404358!3d19.090230751527887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb1c262ae1ec3%3A0x52689a9d3eeeeab8!2sHotel%20Destiny!5e0!3m2!1sen!2sin!4v1768844456072!5m2!1sen!2sin"
                className="w-full h-full rounded-[2.5rem] border border-white/10 brightness-70 saturate-170"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, detail }) {
  return (
    <div className="space-y-2 group">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <h4 className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
          {title}
        </h4>
      </div>
      <p className="text-sm text-white font-bold leading-relaxed">{detail}</p>
    </div>
  );
}

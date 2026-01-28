import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";
import { FaCalendarDays, FaClock, FaUsers, FaCircleCheck, FaChampagneGlasses } from "react-icons/fa6";

export default function Booking() {
  const { user } = useAppSelector((state) => state.auth);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize with empty strings; we will handle fallbacks in the JSX
  const [formData, setFormData] = useState({
    date: "",
    time: "19:00",
    guests: "2",
    specialRequests: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl flex items-center justify-center min-h-[70vh]">
        <div className="text-center space-y-8 bg-gradient-to-b from-[#1a1b1c] to-[#161718] border border-white/5 p-12 rounded-[3rem] shadow-2xl max-w-xl animate-in zoom-in duration-500">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-5xl">
              <FaCircleCheck className="animate-pulse" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-5xl font-serif italic text-white tracking-tight">Reservation Confirmed</h2>
            <p className="text-muted-foreground leading-relaxed uppercase tracking-widest text-[10px] font-black">We've saved a seat for you</p>
          </div>
          <div className="bg-white/5 rounded-3xl p-6 text-sm border border-white/5">
            <p className="text-muted-foreground italic">
              "Thank you, <span className="text-white font-bold">{user?.name}</span>. We are preparing for your arrival on <span className="text-primary font-bold">{formData.date}</span> at <span className="text-primary font-bold">{formData.time}</span>."
            </p>
          </div>
          <Button onClick={() => setIsSubmitted(false)} className="rounded-full px-10 h-14 uppercase tracking-widest text-[10px] font-black">
            Create Another Event
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="lg:sticky lg:top-40 space-y-10">
          <div className="space-y-6">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] block">Fine Dining Experience</span>
            <h1 className="text-6xl md:text-7xl font-serif italic text-white leading-[0.9] tracking-tighter">
              Reserve Your <br /> <span className="text-primary">Perfect Table</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FeatureItem icon={<FaCalendarDays />} title="Flexible Booking" desc="Easily manage or reschedule." />
            <FeatureItem icon={<FaChampagneGlasses />} title="Special Events" desc="Personalized decor available." />
          </div>
        </div>

        <div className="bg-[#161718] border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black ml-1">Arrival Date</label>
                <Input
                  type="date"
                  required
                  className="h-14 bg-white/[0.03] border-white/10 rounded-2xl text-white px-5"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black ml-1">Preferred Time</label>
                <div className="relative">
                  <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/50" />
                  <select
                    className="w-full h-14 pl-12 pr-6 bg-[#212223] border border-white/10 rounded-2xl text-white appearance-none text-sm font-bold"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    {["12:00", "13:30", "18:00", "19:00", "20:30", "21:00"].map(t => (
                      <option key={t} value={t}>{t} {parseInt(t) >= 12 ? 'PM' : 'AM'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black ml-1">Contact Name</label>
                <Input
                  disabled
                  className="h-14 bg-white/[0.01] border-white/5 rounded-2xl text-muted-foreground cursor-not-allowed opacity-60"
                  /* FIX: If user is still loading, show "Loading..." else show name */
                  value={user?.name || "Loading..."} 
                />
              </div>
            </div>

            <Button 
                type="submit" 
                disabled={loading || !user}
                className="w-full h-16 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black shadow-2xl shadow-primary/20 transition-all active:scale-95"
            >
              {loading ? "Processing..." : "Confirm Reservation"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{title}</h4>
        <p className="text-muted-foreground text-[10px] leading-tight mt-1">{desc}</p>
      </div>
    </div>
  );
}

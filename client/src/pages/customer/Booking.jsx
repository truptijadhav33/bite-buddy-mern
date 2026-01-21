import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { FaCalendarDays, FaClock, FaUsers, FaCircleCheck } from "react-icons/fa6";

export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "19:00",
    guests: "2",
    name: "",
    email: "",
    specialRequests: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 bg-[#161718] border border-white/5 p-12 rounded-3xl shadow-2xl max-w-xl">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary text-4xl animate-bounce">
              <FaCircleCheck />
            </div>
          </div>
          <h2 className="text-4xl font-serif italic text-white">Table Reserved!</h2>
          <p className="text-muted-foreground text-lg">
            Thank you, <span className="text-white font-bold">{formData.name}</span>. Your reservation for <span className="text-white font-bold">{formData.guests} guests</span> on <span className="text-white font-bold">{formData.date}</span> at <span className="text-white font-bold">{formData.time}</span> has been confirmed.
          </p>
          <div className="pt-6">
            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full px-8">
              Make Another Reservation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-screen-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Reservation Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-serif italic text-white leading-tight">
              Reserve Your <br />
              <span className="text-primary">Perfect Table</span>
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-lg">
              Whether it's a romantic dinner, a family gathering, or a business lunch,
              we ensure your experience is nothing short of extraordinary.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                <FaCalendarDays />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Instant Confirmation</h3>
                <p className="text-muted-foreground text-sm">Your reservation is instantly verified and confirmed.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10">
                <FaUsers />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Group Friendly</h3>
                <p className="text-muted-foreground text-sm">We accommodate groups of all sizes with elegant seating.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="bg-[#161718] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl space-y-8 relative overflow-hidden group">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

          <h2 className="text-2xl font-bold text-white relative z-10">Booking Details</h2>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold pl-1">Date</label>
                <Input
                  type="date"
                  required
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-white"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold pl-1">Time</label>
                <div className="relative">
                  <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm" />
                  <select
                    className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-white appearance-none transition-all"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  >
                    <option value="12:00" className="bg-[#161718]">12:00 PM</option>
                    <option value="13:00" className="bg-[#161718]">01:00 PM</option>
                    <option value="14:00" className="bg-[#161718]">02:00 PM</option>
                    <option value="19:00" className="bg-[#161718]">07:00 PM</option>
                    <option value="20:00" className="bg-[#161718]">08:00 PM</option>
                    <option value="21:00" className="bg-[#161718]">09:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold pl-1">Number of Guests</label>
              <div className="relative">
                <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm" />
                <select
                  className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none text-white appearance-none transition-all"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                >
                  <option value="1" className="bg-[#161718]">1 Person</option>
                  <option value="2" className="bg-[#161718]">2 People</option>
                  <option value="3" className="bg-[#161718]">3 People</option>
                  <option value="4" className="bg-[#161718]">4 People</option>
                  <option value="5+" className="bg-[#161718]">5+ People</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold pl-1">Full Name</label>
                <Input
                  placeholder="John Doe"
                  required
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground font-bold pl-1">Email Address</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-[1.02]">
              Book My Table
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

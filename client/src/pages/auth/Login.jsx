import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/authSlice";
import { FaUtensils, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa6";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (!result.error) navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements (Facebook/IG style gradients) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-[400px] z-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl rotate-12 shadow-[0_20px_50px_rgba(234,193,87,1.3)] mb-4">
             <FaUtensils className="text-black text-3xl -rotate-12" />
          </div>
          <h1 className="text-3xl font-serif italic font-black text-white tracking-tighter">
            Bite<span className="text-primary">Buddy</span>
          </h1>
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] mt-2">
            Signature Dining
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111111] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-3 rounded-xl text-center font-bold">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</label>
                <Link to="/forgot" className="text-[9px] font-bold text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-xs py-5 rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-4 shadow-[0_10px_20px_rgba(234,193,87,0.2)]"
            >
              {loading ? "Authenticating..." : "Sign In"}
              <FaArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-bold hover:underline underline-offset-4">Create one</Link>
        </p>
      </div>
    </div>
  );
}
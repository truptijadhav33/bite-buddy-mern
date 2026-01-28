import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword} from "../../slices/authSlice";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(email));
    if (!result.error) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full bg-[#161718] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <Link to="/login" className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest mb-8 hover:gap-4 transition-all">
            <FaArrowLeft /> Back to Login
          </Link>

          <h2 className="text-3xl font-serif italic text-white mb-2 tracking-tighter">Recover <span className="text-primary">Access</span></h2>
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-8 font-bold opacity-70">Enter your email to receive a reset link.</p>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl text-center">
              <p className="text-emerald-500 text-sm font-medium">Check your inbox! We've sent instructions to reset your password.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary/50 transition-all outline-none"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>}

              <button
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-primary text-black font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

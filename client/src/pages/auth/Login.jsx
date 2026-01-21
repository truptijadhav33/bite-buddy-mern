import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, clearError } from "../../slices/authSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, role, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") navigate("/admin");
      else if (role === "staff") navigate("/staff");
      else navigate("/");
    }

    if (error) {
      // Clear error after some time or on interaction
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [isAuthenticated, role, navigate, error, dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] p-4 font-sans">
      <div className="w-full max-w-md space-y-8 rounded-[2.5rem] border border-white/5 bg-[#161718] p-10 shadow-2xl relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>

        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black tracking-tight text-white italic font-serif">
            Orderly<span className="text-primary italic">OS</span>
          </h2>
          <p className="text-sm text-muted-foreground font-light uppercase tracking-[0.2em]">Management Portal</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Email Address</label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
                placeholder="admin@restaurant.com"
                className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Password</label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                placeholder="••••••••"
                className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-black hover:bg-primary/90 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(234,193,87,0.2)] disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Protected Area • Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}

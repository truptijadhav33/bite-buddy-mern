import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { register, clearError } from "../../slices/authSlice";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { FaUtensils, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa6";


export default function Register() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, role, loading, error } = useAppSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (role === "admin") navigate("/admin");
            else if (role === "staff") navigate("/staff");
            else navigate("/");
        }

        if (error) {
            setTimeout(() => dispatch(clearError()), 5000);
        }
    }, [isAuthenticated, role, navigate, error, dispatch]);

    return (
        <div className="container mx-auto px-4 pt-10 pb-5 max-w-screen-xl relative z-10 flex min-h-screen items-center justify-center bg-[#0a0a0a]">
            <div className="w-full max-w-md space-y-8 rounded-[2.5rem] border border-white/5 bg-[#161718] p-7 shadow-2xl relative overflow-hidden">
                {/* Abstract Background Decoration */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>
                
                <div className="flex flex-col items-center mb-4">
                          <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl rotate-12 shadow-[0_20px_50px_rgba(234,193,87,1.3)] mb-4">
                             <FaUtensils className="text-black text-3xl -rotate-12" />
                          </div>
                          <h1 className="text-3xl font-serif italic font-black text-white tracking-tighter">
                            Bite<span className="text-primary">Buddy</span>
                          </h1>
                          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.4em] mt-2">
                            Join Our Community
                          </p>
                        </div>

                <form onSubmit={onSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[12px]  uppercase tracking-widest text-muted-foreground ml-4">Full Name</label>
                            <Input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                                placeholder="John Doe"
                                className="h-10 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px]  uppercase tracking-widest text-muted-foreground ml-4">Email Address</label>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                placeholder="john@example.com"
                                className="h-10 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[12px]  uppercase tracking-widest text-muted-foreground ml-4">Password</label>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                placeholder="••••••••"
                                className="h-10 bg-white/5 border-white/10 rounded-2xl px-6 focus:border-primary/50 text-white placeholder:text-white/20"
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
                        className="w-full h-10 bg-primary text-black hover:bg-primary/90 rounded-2xl text-sm  uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(234,193,87,0.2)] disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </Button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-[12px] text-muted-foreground uppercase tracking-widest font-bold">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetPassword } from "../../slices/authSlice";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import { FaLock, FaArrowLeft, FaCheck } from "react-icons/fa6";

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.auth);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        if (password !== confirmPassword) {
            return setValidationError("Passwords do not match");
        }

        if (password.length < 6) {
            return setValidationError("Password must be at least 6 characters");
        }

        const result = await dispatch(resetPassword({ token, password }));
        if (result.meta.requestStatus === "fulfilled") {
            navigate("/login", { state: { message: "Password reset successful! Please login with your new password." } });
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#161718] p-10 rounded-3xl border border-white/5 shadow-2xl space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Set New Password</h1>
                    <p className="text-muted-foreground text-sm font-light">
                        Create a strong, unique password to secure your account.
                    </p>
                </div>

                {(error || validationError) && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-center">
                        {error || validationError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">New Password</label>
                            <div className="relative group">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 h-12 rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Confirm Password</label>
                            <div className="relative group">
                                <FaCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50 h-12 rounded-xl"
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-black hover:bg-white transition-all h-12 rounded-xl font-black uppercase tracking-[0.2em] transform active:scale-95 shadow-[0_10px_20px_-10px_rgba(234,193,87,0.3)]"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>

                    <div className="text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                        >
                            <FaArrowLeft /> Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

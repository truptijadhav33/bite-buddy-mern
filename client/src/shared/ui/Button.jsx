import { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge tailwind classes cleanly
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
        // Gold/Primary Gradient for your Luxury Theme
        default: "bg-gradient-to-tr from-primary to-amber-200 text-black font-black shadow-[0_10px_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95",
        
        destructive: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white shadow-lg shadow-red-500/10",
        
        // Glassmorphism Outline
        outline: "border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white shadow-xl",
        
        secondary: "bg-[#161718] text-white border border-white/5 hover:border-primary/50 hover:text-primary shadow-2xl",
        
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        
        link: "text-primary underline-offset-8 hover:underline decoration-primary/50",
    };

    const sizes = {
        default: "h-12 px-8 py-3 rounded-2xl text-[11px] tracking-[0.2em] uppercase",
        sm: "h-9 rounded-xl px-4 text-[9px] tracking-widest uppercase",
        lg: "h-14 rounded-[2rem] px-10 text-[12px] tracking-[0.25em] font-black uppercase",
        icon: "h-11 w-11 rounded-full",
    };

    return (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                "disabled:pointer-events-none disabled:opacity-40 disabled:grayscale",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";

export default Button;
export default function Badge({ children, variant = "default", className = "" }) {
    const variants = {
        default: "bg-primary/10 text-primary border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-border",
        outline: "border-border text-foreground",
        destructive: "bg-destructive/10 text-destructive border-destructive/20",
        success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };

    const selectedVariant = variants[variant.toLowerCase()] || variants.default;

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${selectedVariant} ${className}`}
        >
            {children}
        </span>
    );
}

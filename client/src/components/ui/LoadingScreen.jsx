// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black font-sans">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30 animate-pulse" />

            <div className="relative flex flex-col items-center">
                {/* Animated Logo/Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-black tracking-tighter text-white italic font-serif">
                        Orderly<span className="text-primary">OS</span>
                    </h1>
                    <div className="h-1 w-12 bg-primary mx-auto mt-4 rounded-full" />
                </motion.div>

                {/* Modern Loader */}
                <div className="relative w-24 h-24">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary border-transparent"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white/20 border-transparent"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground animate-pulse"
                >
                    Initializing Secure Environment
                </motion.p>
            </div>
        </div>
    );
}

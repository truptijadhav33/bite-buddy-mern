import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCircleCheck, FaXmark } from "react-icons/fa6";

let toastFunction = null;

export const showToast = (message) => {
    if (toastFunction) toastFunction(message);
};

export default function Toast() {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        toastFunction = (message) => {
            setToast(message);
            setTimeout(() => setToast(null), 3000);
        };
    }, []);

    if (!toast) return null;

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom duration-500">
            <div className="bg-[#161718] border border-primary/20 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 min-w-[300px] backdrop-blur-xl">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl">
                    <FaCircleCheck />
                </div>
                <div className="flex-1">
                    <p className="font-bold text-sm text-white">Success!</p>
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-muted-foreground">{toast}</p>
                        <Link to="/cart" onClick={() => setToast(null)} className="text-xs text-primary font-bold hover:underline shrink-0">View Cart</Link>
                    </div>
                </div>
                <button onClick={() => setToast(null)} className="text-muted-foreground hover:text-white transition-colors">
                    <FaXmark />
                </button>
            </div>
        </div>
    );
}

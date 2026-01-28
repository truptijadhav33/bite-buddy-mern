import { Link } from "react-router-dom";

export default function QuickLink({ to, icon, title, desc, color }) {
    return (
        <Link to={to} className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] flex flex-col gap-4 group ${color}`}>
            <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center text-xl group-hover:bg-black/40 transition-colors">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-white group-hover:underline underline-offset-4">{title}</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed mt-1">{desc}</p>
            </div>
        </Link>
    );
}

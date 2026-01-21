export default function StatCard({ icon, label, value, color, groupHover = true }) {
    return (
        <div className={`bg-[#161718] border border-white/5 p-6 rounded-3xl shadow-xl transition-all hover:border-white/10 ${groupHover ? 'group' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl ${color} ${groupHover ? 'group-hover:scale-110 transition-transform' : ''}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
                    <p className="text-3xl font-black text-white mt-1">{value}</p>
                </div>
            </div>
        </div>
    );
}

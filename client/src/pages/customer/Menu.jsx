import MenuList from "../../features/menu/components/MenuList";

export default function Menu() {
  return (
    <div className="min-h-screen bg-black">
      {/* Decorative Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 max-w-screen-xl relative z-10">
        
        {/* Menu Items List Component */}
        <MenuList />
        
        {/* Fine Print Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest leading-relaxed">
                Prices are inclusive of all taxes. <br/>
                Please inform our staff of any food allergies before placing your order.
            </p>
        </div>
      </div>
    </div>
  );
}

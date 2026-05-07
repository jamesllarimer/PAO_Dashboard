export default function NavBar() {
    return (
        <header className="bg-army-black border-b border-army-gold flex items-center justify-between px-4 h-12 shrink-0 sticky top-0 z-[100]">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-army-gold flex items-center justify-center text-[10px] font-bold text-army-black tracking-[0.05em] shrink-0">
                    PAO
                </div>
                <div>
                    <div className="text-[13px] font-semibold text-white tracking-[0.08em] uppercase">
                        PA0 Reporting
                    </div>
                    <div className="text-[10px] text-muted tracking-[0.05em] uppercase">
                        Brigade → Division
                    </div>
                </div>
            </div>
        </header>
    );
}

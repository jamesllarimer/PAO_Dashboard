export default function MetaChip({label, value}: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-[2px]">
            <span className="text-[9px] text-muted uppercase tracking-[0.08em] font-semibold">
                {label}
            </span>
            <span className="text-xs text-white font-medium">
                {value || '—'}
            </span>
        </div>
    );
}

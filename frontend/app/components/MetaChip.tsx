export default function MetaChip({label, value}: { label: string; value: string }) {
    const ARMY_GOLD  = '#FFCC01';
    const SURFACE    = '#2a2728';
    const SURFACE2   = '#332f30';
    const SURFACE3   = '#3d3839';
    const BORDER     = '#3f3b3c';
    const BORDER2    = '#4f4b4c';
    const MUTED      = '#9a9496';
    const WHITE      = '#FFFFFF';
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2px'}}>
            <span style={{
                fontSize: '9px',
                color: MUTED,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
            }}>
                {label}
            </span>
            <span style={{fontSize: '12px', color: WHITE, fontWeight: 500}}>
                {value || '—'}
            </span>
        </div>
    );
}
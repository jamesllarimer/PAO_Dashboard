import type {EventResponseDto} from "~/types";
import MetaChip from "~/components/MetaChip";

type gridRowProps = {
    event: EventResponseDto | undefined;
}

const ARMY_GOLD  = '#FFCC01';
const SURFACE    = '#2a2728';
const SURFACE2   = '#332f30';
const SURFACE3   = '#3d3839';
const BORDER     = '#3f3b3c';
const BORDER2    = '#4f4b4c';
const MUTED      = '#9a9496';
const WHITE      = '#FFFFFF';

function StatusBadge({status}: { status: string }) {
    const styles: Record<string, { bg: string; color: string; border: string }> = {
        PLANNING:     {bg: '#2a2728', color: MUTED,      border: BORDER},
        SCHEDULED:    {bg: '#3a3000', color: ARMY_GOLD,  border: '#5a4a00'},
        IN_PROGRESS:  {bg: '#1a2a3a', color: '#6ab0e8',  border: '#2a4a6a'},
        UNDER_REVIEW: {bg: '#1a2a3a', color: '#6ab0e8',  border: '#2a4a6a'},
        COMPLETED:    {bg: '#1a2a1a', color: '#6db86d',  border: '#2a4a2a'},
        CANCELLED:    {bg: '#3a1a1a', color: '#e87070',  border: '#5a2a2a'},
        PUBLISHED:    {bg: '#1a2a1a', color: '#6db86d',  border: '#2a4a2a'},
        SUBMITTED:    {bg: '#3a3000', color: ARMY_GOLD,  border: '#5a4a00'},
    };

    const key = status?.toUpperCase().replace(/\s+/g, '_') ?? 'PLANNING';
    const s = styles[key] ?? styles.PLANNING;

    return (
        <span style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '2px',
            fontSize: '10px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            backgroundColor: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
            whiteSpace: 'nowrap',
        }}>
            {status ?? 'Unknown'}
        </span>
    );
}

function formatDate(date: string | undefined) {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
    });
}

export default function EventGridRow({event}: gridRowProps) {
    return (
        <div style={{
            backgroundColor: SURFACE,
            border: `1px solid ${BORDER}`,
            borderRadius: '4px',
            marginBottom: '10px',
            overflow: 'hidden',
            transition: 'border-color 0.15s',
        }}
             onMouseEnter={e => (e.currentTarget.style.borderColor = BORDER2)}
             onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
        >
            {/* Card header — name, type badge, status badge */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderBottom: `1px solid ${BORDER}`,
                backgroundColor: SURFACE2,
                gap: '12px',
            }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0}}>
                    <span style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: ARMY_GOLD ,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {event?.name}
                    </span>
                    {event?.theme && (
                        <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            backgroundColor: SURFACE3,
                            color: WHITE,
                            border: `1px solid ${ARMY_GOLD}`,
                            borderRadius: '2px',
                            fontSize: '10px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                        }}>
                            {event?.theme}
                        </span>
                    )}
                    {event?.eventType && (
                        <span style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            backgroundColor: SURFACE3,
                            color: WHITE,
                            border: `1px solid ${BORDER2}`,
                            borderRadius: '2px',
                            fontSize: '10px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                        }}>
                            {event?.eventType}
                        </span>
                    )}
                </div>
                <div style={{flexShrink: 0}}>
                    <StatusBadge status={event?.status ?? 'Planning'}/>
                </div>
            </div>

            {/* Card body */}
            <div style={{padding: '12px 16px'}}>

                {/* Description */}
                {event?.description && (
                    <p style={{
                        fontSize: '12px',
                        color: MUTED,
                        margin: '0 0 12px',
                        lineHeight: 1.6,
                    }}>
                        {event?.description}
                    </p>
                )}

                {/* Meta row — lead, unit, dates */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '12px',
                    paddingTop: event?.description ? '12px' : '0',
                    borderTop: event?.description ? `1px solid ${BORDER}` : 'none',
                }}>
                    <MetaChip label="Lead"       value={event?.lead ?? '—'}/>
                    <MetaChip label="Unit"       value={event?.unit ?? '—'}/>
                    <MetaChip label="Start date" value={formatDate(event?.startDate)}/>
                    <MetaChip label="End date"   value={formatDate(event?.endDate)}/>
                </div>
            </div>
        </div>
    );
}
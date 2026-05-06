import type {EventRequest, EventResponseDto, EventStatus, EventType, PostingLocation, Theme, User} from "~/types";
import MetaChip from "~/components/MetaChip";
import React, { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GridRowProps = {
    event: EventResponseDto;
    // Dropdown lists — fetched once by the parent, passed down to every row
    users: User[];
    eventTypes: EventType[];
    postingLocations: PostingLocation[];
    eventStatuses: EventStatus[];
    eventThemes: Theme[];
    // Callbacks — parent owns API calls and state updates
    onDelete: (id: number) => void;
    onSave: (draft: EditDraft) => void;
};
type EditDraft = EventRequest & { id: number };

// ─── Design tokens ────────────────────────────────────────────────────────────

const ARMY_GOLD = '#FFCC01';
const SURFACE   = '#2a2728';
const SURFACE2  = '#332f30';
const SURFACE3  = '#3d3839';
const BORDER    = '#3f3b3c';
const BORDER2   = '#4f4b4c';
const MUTED     = '#9a9496';
const WHITE     = '#FFFFFF';
const RED_DIM   = '#e87070';
const GREEN_DIM = '#6db86d';

// ─── Shared style helpers ─────────────────────────────────────────────────────

const INPUT_BASE: React.CSSProperties = {
    backgroundColor: '#1a1718',
    border: `1px solid ${BORDER2}`,
    color: WHITE,
    padding: '5px 8px',
    fontSize: '12px',
    borderRadius: '3px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
};

const SELECT_BASE: React.CSSProperties = {
    ...INPUT_BASE,
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%239a9496'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    paddingRight: '24px',
};

function FieldLabel({ children }: { children: React.ReactNode }) {
    return (
        <label style={{
            display: 'block',
            fontSize: '10px',
            color: MUTED,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            marginBottom: '4px',
            fontWeight: 600,
        }}>
            {children}
        </label>
    );
}

function btnStyle(color: string, bg: string, borderColor: string): React.CSSProperties {
    return {
        background: bg,
        border: `1px solid ${borderColor}`,
        color,
        padding: '3px 10px',
        fontSize: '11px',
        fontWeight: 600,
        borderRadius: '3px',
        cursor: 'pointer',
        letterSpacing: '0.04em',
        textTransform: 'uppercase' as const,
        whiteSpace: 'nowrap' as const,
    };
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, { bg: string; color: string; border: string }> = {
        PLANNING:     { bg: '#2a2728', color: MUTED,     border: BORDER },
        SCHEDULED:    { bg: '#3a3000', color: ARMY_GOLD, border: '#5a4a00' },
        IN_PROGRESS:  { bg: '#1a2a3a', color: '#6ab0e8', border: '#2a4a6a' },
        UNDER_REVIEW: { bg: '#1a2a3a', color: '#6ab0e8', border: '#2a4a6a' },
        COMPLETED:    { bg: '#1a2a1a', color: GREEN_DIM, border: '#2a4a2a' },
        CANCELLED:    { bg: '#3a1a1a', color: RED_DIM,   border: '#5a2a2a' },
        PUBLISHED:    { bg: '#1a2a1a', color: GREEN_DIM, border: '#2a4a2a' },
        SUBMITTED:    { bg: '#3a3000', color: ARMY_GOLD, border: '#5a4a00' },
    };
    const key = status?.toUpperCase().replace(/\s+/g, '_') ?? 'PLANNING';
    const s = styles[key] ?? styles.PLANNING;
    return (
        <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '2px',
            fontSize: '10px', fontWeight: 600, textTransform: 'uppercase',
            letterSpacing: '0.05em', backgroundColor: s.bg, color: s.color,
            border: `1px solid ${s.border}`, whiteSpace: 'nowrap',
        }}>
            {status ?? 'Unknown'}
        </span>
    );
}

function formatDate(date: string | undefined) {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: '2-digit',
    });
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EventGridRow({
                                         event,
                                         users,
                                         eventTypes,
                                         postingLocations,
                                         eventStatuses,
                                         eventThemes,
                                         onDelete,
                                         onSave,
                                     }: GridRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<EditDraft>({
        id:                event.id,
        name:              event.name,
        description:       event.description ?? '',
        eventTypeId:       event.eventTypeId,
        leadId:            event.leadId,
        eventStatusId:     event.eventStatusId,
        postingLocationId: event.postingLocationId,
        eventThemeId:      event.eventThemeId,
        startDate:         event.startDate?.slice(0, 10) ?? '',
        endDate:           event.endDate?.slice(0, 10) ?? '',
    });

    function set(field: keyof EditDraft, value: string | number) {
        setDraft(prev => ({ ...prev, [field]: value }));
    }

    function handleSave() {
        onSave(draft);
        setIsEditing(false);
    }

    function handleCancel() {
        setDraft({
            id:                event.id,
            name:              event.name,
            description:       event.description ?? '',
            eventTypeId:       event.eventTypeId,
            leadId:            event.leadId,
            eventStatusId:     event.eventStatusId,
            postingLocationId: event.postingLocationId,
            eventThemeId:      event.eventThemeId,
            startDate:         event.startDate?.slice(0, 10) ?? '',
            endDate:           event.endDate?.slice(0, 10) ?? '',
        });
        setIsEditing(false);
    }

    // Resolve lead display name from FK for read view
    const leadUser = users.find(u => u.id === event.leadId);
    const leadLabel = leadUser
        ? `${leadUser.rankAbbreviation} ${leadUser.lastName}`
        : (event.lead ?? '—');

    return (
        <div
            style={{
                backgroundColor: SURFACE,
                border: `1px solid ${isEditing ? ARMY_GOLD : BORDER}`,
                borderRadius: '4px',
                marginBottom: '10px',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => { if (!isEditing) e.currentTarget.style.borderColor = BORDER2; }}
            onMouseLeave={e => { if (!isEditing) e.currentTarget.style.borderColor = BORDER; }}
        >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderBottom: `1px solid ${BORDER}`,
                backgroundColor: SURFACE2, gap: '12px', flexWrap: 'wrap',
            }}>
                {/* Name + badges */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                    {isEditing ? (
                        <input
                            style={{ ...INPUT_BASE, fontSize: '14px', fontWeight: 600, color: ARMY_GOLD, maxWidth: '300px' }}
                            value={draft.name ?? ''}
                            onChange={e => set('name', e.target.value)}
                            placeholder="Event name"
                        />
                    ) : (
                        <span style={{
                            fontSize: '14px', fontWeight: 600, color: ARMY_GOLD,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                            {event.name}
                        </span>
                    )}
                    {!isEditing && event.theme && (
                        <span style={{
                            padding: '2px 8px', backgroundColor: SURFACE3, color: WHITE,
                            border: `1px solid ${ARMY_GOLD}`, borderRadius: '2px', fontSize: '10px',
                            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                            whiteSpace: 'nowrap', flexShrink: 0,
                        }}>
                            {event.theme}
                        </span>
                    )}
                    {!isEditing && event.eventType && (
                        <span style={{
                            padding: '2px 8px', backgroundColor: SURFACE3, color: WHITE,
                            border: `1px solid ${BORDER2}`, borderRadius: '2px', fontSize: '10px',
                            fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
                            whiteSpace: 'nowrap', flexShrink: 0,
                        }}>
                            {event.eventType}
                        </span>
                    )}
                </div>

                {/* Status + action buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <StatusBadge status={event.status ?? 'Planning'} />
                    {isEditing ? (
                        <>
                            <button style={btnStyle(GREEN_DIM, '#1a2a1a', '#2a4a2a')} onClick={handleSave}>Save</button>
                            <button style={btnStyle(MUTED, SURFACE, BORDER)} onClick={handleCancel}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button style={btnStyle(ARMY_GOLD, SURFACE2, ARMY_GOLD)} onClick={() => setIsEditing(true)}>Edit</button>
                            <button style={btnStyle(RED_DIM, '#3a1a1a', '#5a2a2a')} onClick={() => onDelete(event.id)}>Delete</button>
                        </>
                    )}
                </div>
            </div>

            {/* ── Body ────────────────────────────────────────────────────── */}
            <div style={{ padding: '12px 16px' }}>
                {isEditing ? (
                    // ── Edit form ─────────────────────────────────────────
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

                        {/* Description — spans full width */}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <FieldLabel>Description</FieldLabel>
                            <textarea
                                style={{ ...INPUT_BASE, minHeight: '64px', resize: 'vertical' }}
                                value={draft.description ?? ''}
                                onChange={e => set('description', e.target.value)}
                                placeholder="Brief description of the event"
                            />
                        </div>

                        {/* Start Date */}
                        <div>
                            <FieldLabel>Start Date</FieldLabel>
                            <input
                                type="date"
                                style={INPUT_BASE}
                                value={draft.startDate?.slice(0, 10) ?? ''}
                                onChange={e => set('startDate', e.target.value)}
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <FieldLabel>End Date</FieldLabel>
                            <input
                                type="date"
                                style={INPUT_BASE}
                                value={draft.endDate?.slice(0, 10) ?? ''}
                                onChange={e => set('endDate', e.target.value)}
                            />
                        </div>

                        {/* Lead */}
                        <div>
                            <FieldLabel>Lead</FieldLabel>
                            <select
                                style={SELECT_BASE}
                                value={String(draft.leadId ?? '')}
                                onChange={e => set('leadId', Number(e.target.value))}
                            >
                                <option value="">— Select lead —</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {`${u.rankAbbreviation} ${u.lastName}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Event Type */}
                        <div>
                            <FieldLabel>Event Type</FieldLabel>
                            <select
                                style={SELECT_BASE}
                                value={String(draft.eventTypeId ?? '')}
                                onChange={e => set('eventTypeId', Number(e.target.value))}
                            >
                                <option value="">— Select type —</option>
                                {eventTypes.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Posting Location */}
                        <div>
                            <FieldLabel>Posting Location</FieldLabel>
                            <select
                                style={SELECT_BASE}
                                value={String(draft.postingLocationId ?? '')}
                                onChange={e => set('postingLocationId', Number(e.target.value))}
                            >
                                <option value="">— Select location —</option>
                                {postingLocations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Event Status */}
                        <div>
                            <FieldLabel>Status</FieldLabel>
                            <select
                                style={SELECT_BASE}
                                value={String(draft.eventStatusId ?? '')}
                                onChange={e => set('eventStatusId', Number(e.target.value))}
                            >
                                <option value="">— Select status —</option>
                                {eventStatuses.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Event Theme */}
                        <div>
                            <FieldLabel>Theme</FieldLabel>
                            <select
                                style={SELECT_BASE}
                                value={String(draft.eventThemeId ?? '')}
                                onChange={e => set('eventThemeId', Number(e.target.value))}
                            >
                                <option value="">— Select theme —</option>
                                {eventThemes.map(theme => (
                                    <option key={theme.id} value={theme.id}>{theme.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                ) : (
                    // ── Read view ─────────────────────────────────────────
                    <>
                        {event.description && (
                            <p style={{ fontSize: '12px', color: MUTED, margin: '0 0 12px', lineHeight: 1.6 }}>
                                {event.description}
                            </p>
                        )}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                            gap: '12px',
                            paddingTop: event.description ? '12px' : '0',
                            borderTop: event.description ? `1px solid ${BORDER}` : 'none',
                        }}>
                            <MetaChip label="Lead"             value={leadLabel} />
                            <MetaChip label="Unit"             value={event.unit ?? '—'} />
                            <MetaChip label="Posting Location" value={event.postingLocation ?? '—'} />
                            <MetaChip label="Start date"       value={formatDate(event.startDate)} />
                            <MetaChip label="End date"         value={formatDate(event.endDate)} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
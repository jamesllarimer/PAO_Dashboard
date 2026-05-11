import type {
    EventRequest,
    EventResponseDto,
    EventStatus,
    EventType,
    PostingLocation,
    ProductType,
    Theme,
    User
} from "~/types";
import MetaChip from "~/components/MetaChip";
import React, {useState} from "react";


type GridRowProps = {
    event: EventResponseDto;
    // Dropdown lists — fetched once by the parent, passed down to every row
    users: User[];
    eventTypes: EventType[];
    productTypes: ProductType[];
    postingLocations: PostingLocation[];
    eventStatuses: EventStatus[];
    eventThemes: Theme[];
    // Callbacks — parent owns API calls and state updates
    onDelete: (id: number) => void;
    onSave: (draft: EditDraft) => void;
};
type EditDraft = EventRequest & { id: number };

const INPUT_CLS = "bg-[#1a1718] border border-ui-border-2 text-white py-[5px] px-2 text-xs rounded-[3px] outline-none w-full box-border";
const SELECT_CLS = `${INPUT_CLS} cursor-pointer select-arrow`;
const BTN_BASE = "py-[3px] px-[10px] text-[11px] font-semibold rounded-[3px] cursor-pointer tracking-[0.04em] uppercase whitespace-nowrap border";

function FieldLabel({children}: { children: React.ReactNode }) {
    return (
        <label className="block text-[10px] text-muted uppercase tracking-[0.07em] mb-1 font-semibold">
            {children}
        </label>
    );
}

// ─── StatusBadge ─────────────────────────────────────────────────────────────

function StatusBadge({status}: { status: string }) {
    const styles: Record<string, { bg: string; color: string; border: string }> = {
        PLANNING: {bg: '#2a2728', color: '#9a9496', border: '#3f3b3c'},
        SCHEDULED: {bg: '#3a3000', color: '#FFCC01', border: '#5a4a00'},
        IN_PROGRESS: {bg: '#1a2a3a', color: '#6ab0e8', border: '#2a4a6a'},
        UNDER_REVIEW: {bg: '#1a2a3a', color: '#6ab0e8', border: '#2a4a6a'},
        COMPLETED: {bg: '#1a2a1a', color: '#6db86d', border: '#2a4a2a'},
        CANCELLED: {bg: '#3a1a1a', color: '#e87070', border: '#5a2a2a'},
        PUBLISHED: {bg: '#1a2a1a', color: '#6db86d', border: '#2a4a2a'},
        SUBMITTED: {bg: '#3a3000', color: '#FFCC01', border: '#5a4a00'},
    };
    const key = status?.toUpperCase().replace(/\s+/g, '_') ?? 'PLANNING';
    const s = styles[key] ?? styles.PLANNING;
    return (
        <span
            className="inline-block py-[2px] px-2 rounded-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap"
            style={{backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`}}
        >
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


export default function EventGridRow({
                                         event,
                                         users,
                                         eventTypes,
                                         productTypes,
                                         postingLocations,
                                         eventStatuses,
                                         eventThemes,
                                         onDelete,
                                         onSave,
                                     }: GridRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<EditDraft>({
        id: event.id,
        name: event.name,
        description: event.description ?? '',
        eventTypeId: event.eventTypeId,
        productTypeId: event.productTypeId,
        leadId: event.leadId,
        eventStatusId: event.eventStatusId,
        postingLocationId: event.postingLocationId,
        eventThemeId: event.eventThemeId,
        startDate: event.startDate?.slice(0, 10) ?? '',
        endDate: event.endDate?.slice(0, 10) ?? '',
    });

    function set(field: keyof EditDraft, value: string | number) {
        setDraft(prev => ({...prev, [field]: value}));
    }

    function handleSave() {
        onSave(draft);
        setIsEditing(false);
    }

    function handleCancel() {
        setDraft({
            id: event.id,
            name: event.name,
            description: event.description ?? '',
            eventTypeId: event.eventTypeId,
            productTypeId: event.productTypeId,
            leadId: event.leadId,
            eventStatusId: event.eventStatusId,
            postingLocationId: event.postingLocationId,
            eventThemeId: event.eventThemeId,
            startDate: event.startDate?.slice(0, 10) ?? '',
            endDate: event.endDate?.slice(0, 10) ?? '',
        });
        setIsEditing(false);
    }

    // Resolve lead display name from FK for read view
    const leadUser = users.find(u => u.id === event.leadId);
    const leadLabel = leadUser
        ? `${leadUser.rankAbbreviation} ${leadUser.lastName}`
        : (event.lead ?? '—');

    return (
        <div className={`bg-surface border rounded mb-[10px] overflow-hidden transition-colors duration-[150ms] ${
            isEditing ? 'border-army-gold' : 'border-ui-border hover:border-ui-border-2'
        }`}>
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div
                className="flex items-center justify-between py-3 px-4 border-b border-ui-border bg-surface-2 gap-3 flex-wrap">
                {/* Name + badges */}
                <div className="flex items-center gap-[10px] min-w-0 flex-1">
                    {isEditing ? (
                        <input
                            className={`${INPUT_CLS} text-sm font-semibold text-army-gold max-w-[300px]`}
                            value={draft.name ?? ''}
                            onChange={e => set('name', e.target.value)}
                            placeholder="Event name"
                        />
                    ) : (
                        <span
                            className="text-sm font-semibold text-army-gold overflow-hidden text-ellipsis whitespace-nowrap">
                            {event.name}
                        </span>
                    )}
                    {!isEditing && event.theme && (
                        <span
                            className="py-[2px] px-2 bg-surface-3 text-white border border-army-gold rounded-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap shrink-0">
                            {event.theme}
                        </span>
                    )}
                    {!isEditing && event.eventType && (
                        <span
                            className="py-[2px] px-2 bg-surface-3 text-white border border-ui-border-2 rounded-[2px] text-[10px] font-semibold uppercase tracking-[0.05em] whitespace-nowrap shrink-0">
                            {event.eventType}
                        </span>
                    )}
                </div>

                {/* Status + action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={event.status ?? 'Planning'}/>
                    {isEditing ? (
                        <>
                            <button className={`${BTN_BASE} text-army-green bg-[#1a2a1a] border-[#2a4a2a]`}
                                    onClick={handleSave}>Save
                            </button>
                            <button className={`${BTN_BASE} text-muted bg-surface border-ui-border`}
                                    onClick={handleCancel}>Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button className={`${BTN_BASE} text-army-gold bg-surface-2 border-army-gold`}
                                    onClick={() => setIsEditing(true)}>Edit
                            </button>
                            <button className={`${BTN_BASE} text-red-dim bg-[#3a1a1a] border-[#5a2a2a]`}
                                    onClick={() => onDelete(event.id)}>Delete
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* ── Body ────────────────────────────────────────────────────── */}
            <div className="py-3 px-4">
                {isEditing ? (
                    // ── Edit form ─────────────────────────────────────────
                    <div className="grid grid-cols-2 gap-[14px]">

                        {/* Description — spans full width */}
                        <div className="col-span-2">
                            <FieldLabel>Description</FieldLabel>
                            <textarea
                                className={`${INPUT_CLS} min-h-[64px] resize-y`}
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
                                className={INPUT_CLS}
                                value={draft.startDate?.slice(0, 10) ?? ''}
                                onChange={e => set('startDate', e.target.value)}
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <FieldLabel>End Date</FieldLabel>
                            <input
                                type="date"
                                className={INPUT_CLS}
                                value={draft.endDate?.slice(0, 10) ?? ''}
                                onChange={e => set('endDate', e.target.value)}
                            />
                        </div>

                        {/* Lead */}
                        <div>
                            <FieldLabel>Lead</FieldLabel>
                            <select
                                className={SELECT_CLS}
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
                                className={SELECT_CLS}
                                value={String(draft.eventTypeId ?? '')}
                                onChange={e => set('eventTypeId', Number(e.target.value))}
                            >
                                <option value="">— Select type —</option>
                                {eventTypes.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Product Type */}
                        <div>
                            <FieldLabel>Product Type</FieldLabel>
                            <select
                                className={SELECT_CLS}
                                value={String(draft.productTypeId ?? '')}
                                onChange={e => set('productTypeId', Number(e.target.value))}
                            >
                                <option value="">— Select type —</option>
                                {productTypes.map(t => (
                                    <option key={t.id} value={t.id}>{t.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Posting Location */}
                        <div>
                            <FieldLabel>Posting Location</FieldLabel>
                            <select
                                className={SELECT_CLS}
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
                                className={SELECT_CLS}
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
                                className={SELECT_CLS}
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
                            <p className="text-xs text-muted m-0 mb-3 leading-[1.6]">
                                {event.description}
                            </p>
                        )}
                        <div
                            className={`grid gap-3 ${event.description ? 'pt-3 border-t border-ui-border' : ''}`}
                            style={{gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))'}}
                        >
                            <MetaChip label="Lead" value={leadLabel}/>
                            <MetaChip label="Unit" value={event.unit ?? '—'}/>
                            <MetaChip label="Posting Location" value={event.postingLocation ?? '—'}/>
                            <MetaChip label={"Product Type"} value={event.productType}/>
                            <MetaChip label="Start date" value={formatDate(event.startDate)}/>
                            <MetaChip label="End date" value={formatDate(event.endDate)}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

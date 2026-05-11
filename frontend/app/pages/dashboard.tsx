import type {Route} from "./+types/dashboard";
import type {
    EventRequest,
    EventResponseDto,
    EventStatus,
    EventType,
    PostingLocation,
    ProductType,
    Theme
} from "~/types";
import {useEffect, useState} from "react";
import {useUserContext} from "~/context/UserProfileContext";
import EventGridRow from "~/components/EventGridRow";

type EditDraft = EventRequest & { id: number };

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting dashboard home page"},
        {name: "description", content: "PAO Reporting dashboard home page"},
    ];
}

export default function Dashboard({
                                      params,
                                  }: Route.ComponentProps) {

    const [events, setEvents] = useState<EventResponseDto[]>([]);
    const {activeUser, users} = useUserContext();
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [postingLocations, setPostingLocations] = useState<PostingLocation[]>([]);
    const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([]);
    const [eventThemes, setEventThemes] = useState<Theme[]>([]);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    async function getAllEvents() {
        try {
            let userId = 1
            const response = await fetch(`http://localhost:8080/api/v1/events/userId/${params.userId}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error(response.statusText);
            let data: EventResponseDto[] = await response.json();
            let filtered: EventResponseDto[] = data.filter((event: EventResponseDto) => {
                if (event?.status !== "Archived") {
                    return event;
                }
            });
            filtered = filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            setEvents(filtered);
            for (let event of filtered) {
                console.log(event);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const filteredEvents = events.filter((event: EventResponseDto) => {
        if (dateFrom && (event.startDate?.slice(0, 10) ?? '') < dateFrom) return false;
        if (dateTo && (event.startDate?.slice(0, 10) ?? '') > dateTo) return false;
        return true;
    });

    async function getDropdownData() {
        const [types, locations, statuses, themes, productTypes] = await Promise.all([
            fetch('http://localhost:8080/api/v1/event_type').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/posting_locations').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/event_status').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/theme').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/product_type').then(r => r.json()),
        ]);
        setEventTypes(types);
        setPostingLocations(locations);
        setEventStatuses(statuses);
        setEventThemes(themes);
        setProductTypes(productTypes)
    }

    async function handleDeleteEvent(id: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/events/${id}/delete`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error(response.statusText);

            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSaveEvent(draft: EditDraft) {
        const body: EventRequest = {
            name: draft.name,
            description: draft.description,
            eventTypeId: draft.eventTypeId,
            leadId: draft.leadId,
            eventStatusId: draft.eventStatusId,
            postingLocationId: draft.postingLocationId,
            eventThemeId: draft.eventThemeId,
            startDate: draft.startDate,
            endDate: draft.endDate,
        };
        try {
            const response = await fetch(`http://localhost:8080/api/v1/events/${draft.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error(response.statusText);

            const saved: EventResponseDto = await response.json();

            // Swap the old record out of both state arrays
            const swap = (list: EventResponseDto[]) =>
                list.map(e => (e.id === saved.id ? saved : e))

            setEvents(swap);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllEvents();
        getDropdownData();
    }, []);

    return (
        <div className="flex flex-1">

            <main className="flex-1 p-5 overflow-y-auto bg-army-black">
                <div className="bg-surface border border-ui-border rounded">
                    <div
                        className="flex items-center justify-between px-4 py-3 border-b border-ui-border flex-wrap gap-3">
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Date range */}
                            <div className="flex items-center gap-1">
                                <label className="text-[11px] text-muted uppercase tracking-[0.06em]">From</label>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e: { target: { value: string } }) => setDateFrom(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white text-sm rounded-md py-1.5 px-2 outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 [color-scheme:dark]"
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <label className="text-[11px] text-muted uppercase tracking-[0.06em]">To</label>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e: { target: { value: string } }) => setDateTo(e.target.value)}
                                    className="bg-white/5 border border-white/10 text-white text-sm rounded-md py-1.5 px-2 outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 [color-scheme:dark]"
                                />
                            </div>

                            {/* Clear filters */}
                            {(dateFrom || dateTo) && (
                                <button
                                    onClick={() => {
                                        setDateFrom("");
                                        setDateTo("");
                                    }}
                                    className="text-[11px] text-muted hover:text-white uppercase tracking-[0.06em] cursor-pointer bg-transparent border-none transition-colors duration-150"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>


                    <div className="p-4">
                        {(
                            <div className="p-4">
                                {events.length === 0 ? (
                                    <div className="p-8 text-center text-muted text-[13px]">
                                        No events found
                                    </div>
                                ) : (
                                    filteredEvents.map((event: EventResponseDto) => (
                                        <EventGridRow
                                            key={event.id}
                                            event={event}
                                            users={users ?? []}
                                            eventTypes={eventTypes}
                                            productTypes={productTypes}
                                            postingLocations={postingLocations}
                                            eventStatuses={eventStatuses}
                                            eventThemes={eventThemes}
                                            onDelete={handleDeleteEvent}
                                            onSave={handleSaveEvent}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

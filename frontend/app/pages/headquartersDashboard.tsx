import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useState} from "react";
import ThemeForm from "../components/ThemeForm";
import type {EventRequest, EventResponseDto, EventStatus, EventType, PostingLocation, Theme, User} from "~/types";
import EventGridRow from "~/components/EventGridRow";
import {useUserContext} from "~/context/UserProfileContext";

type EditDraft = EventRequest & { id: number };
export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting — HQ Dashboard"},
        {name: "description", content: "Division HQ dashboard"},
    ];
}

export default function HeadquartersDashboard() {
    const [showSubordinateEvents, setShowSubordinateEvents] = useState<boolean>(true);
    const [events, setEvents] = useState<EventResponseDto[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<EventResponseDto[]>([]);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [postingLocations, setPostingLocations] = useState<PostingLocation[]>([]);
    const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([]);
    const [eventThemes, setEventThemes] = useState<Theme[]>([]);
    const {activeUser, users} = useUserContext();

    let units = [...new Set(events.map(e => e.unit))]
    let submittedEvents = events.filter(x => x?.status === "Submitted").length;
    let publishedEvents = events.filter(x => x?.status === "Published").length;
    let inProgressEvents = events.filter(x => x?.status === "In Progress").length;
    let pressConferences = events.filter(x => x?.eventType === "Press Conference").length;
    let commOutreachEvents = events.filter(x => x?.eventType === "Community Outreach").length;
    let cocEvents = events.filter(x => x?.eventType === "Change of Command").length;
    let trainingEvents = events.filter(x => x?.eventType === "Training Exercise").length;

    async function getAllEvents() {
        try {
            const response = await fetch('http://localhost:8080/api/v1/events', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error(response.statusText);
            let data: EventResponseDto[] = await response.json();
            let filtered: EventResponseDto[] = data.filter((event: EventResponseDto) => {
                if (event?.status !== "Draft") {
                    return event;
                }
            });
            filtered = filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            setEvents(filtered);
            setFilteredEvents(filtered);
            for (let event of filtered) {
                console.log(event);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function filterEvents(selectedUnit: string) {
        if (selectedUnit === "All") {
            setFilteredEvents(events);
            return
        }
        let eventsFiltered = events.filter(x => x?.unit === selectedUnit)
        if (eventsFiltered.length > 0) {
            setFilteredEvents(eventsFiltered);
        }

    }

    async function handleDeleteEvent(id: number) {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/events/${id}/delete`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error(response.statusText);

            // Remove from both state arrays — no page reload needed
            setEvents(prev => prev.filter(e => e.id !== id));
            setFilteredEvents(prev => prev.filter(e => e.id !== id));
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
            setFilteredEvents(swap);
        } catch (error) {
            console.error(error);
        }
    }

    async function getDropdownData() {
        const [types, locations, statuses, themes] = await Promise.all([
            fetch('http://localhost:8080/api/v1/event_type').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/posting_locations').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/event_status').then(r => r.json()),
            fetch('http://localhost:8080/api/v1/theme').then(r => r.json()),
        ]);
        setEventTypes(types);
        setPostingLocations(locations);
        setEventStatuses(statuses);
        setEventThemes(themes);
    }

    useEffect(() => {
        getAllEvents();
        getDropdownData();
    }, []);


    return (
        <div className="flex flex-1">

            <main className="flex-1 p-5 overflow-y-auto bg-army-black">

                {/* Page header */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <h1 className="text-[22px] font-semibold text-white m-0">
                            HQ Dashboard
                        </h1>
                        <p className="text-xs text-muted mt-1 mb-0">
                            1st Armored Division · All subordinate units
                        </p>
                    </div>
                </div>

                {/* Stat cards */}
                {/*todo refactor to allow user to manage what stats they see*/}
                <div className="grid grid-cols-4 gap-[10px] mb-5">
                    {[
                        {label: 'Total Events', value: events.length, sub: 'All units'},
                        {label: 'Submitted', value: submittedEvents, sub: 'Submitted', gold: true},
                        {label: 'Published', value: publishedEvents, sub: 'Published', green: true},
                        {label: 'In Progress', value: inProgressEvents, sub: 'Ongoing Projects'},
                        {label: 'Community Outreach', value: commOutreachEvents, sub: 'Community Outreach'},
                        {label: 'Press Conference', value: pressConferences, sub: 'Press Conference'},
                        {label: 'Training Exercise', value: trainingEvents, sub: 'Training Exercise'},
                        {label: 'Change of Command', value: cocEvents, sub: 'Change of Command'},
                    ].map(card => (
                        <div key={card.label} className="bg-surface border border-ui-border rounded p-[14px]">
                            <div className="text-[10px] text-muted uppercase tracking-[0.08em] mb-1.5">
                                {card.label}
                            </div>
                            <div className={`text-2xl font-bold ${card.gold ? 'text-army-gold' : card.green ? 'text-army-green' : 'text-white'}`}>
                                {card.value}
                            </div>
                            <div className="text-[10px] text-muted mt-1">
                                {card.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Events table card */}
                {/*todo need filtering and sorting*/}
                <div className="bg-surface border border-ui-border rounded">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-ui-border">
                        <span className="text-xs font-semibold text-white uppercase tracking-[0.06em]">
                            Subordinate Events
                        </span>
                        <div className={"flex items-center gap-1"}>
                            <label htmlFor="UnitFilter" className="text-sm/6 font-medium text-white">
                                View By Unit
                            </label>

                            <select className="rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1
                                outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                    name="unitFilter" id="UnitFilter" onChange={e => filterEvents(e.target.value)}>
                                <option value="All">All</option>
                                {units.map(unit => (<option value={unit}>{unit}</option>))}
                            </select>
                        </div>
                    </div>

                    {showSubordinateEvents && (
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
            </main>
        </div>
    );
}

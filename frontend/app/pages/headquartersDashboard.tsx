import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useState} from "react";
import ThemeForm from "../components/ThemeForm";
import type {EventRequest, EventResponseDto, EventStatus, EventType, PostingLocation, Theme, User} from "~/types";
import EventGridRow from "~/components/EventGridRow";
import {useUserContext} from "~/context/UserProfileContext";

const ARMY_BLACK = '#221F20';
const ARMY_GOLD = '#FFCC01';
const SURFACE = '#2a2728';
const SURFACE2 = '#332f30';
const BORDER = '#3f3b3c';
const BORDER2 = '#4f4b4c';
const MUTED = '#9a9496';
const WHITE = '#FFFFFF';
const GREEN = '#6db86d';
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
    let acEvents = events.filter(x => x?.eventType === "Award Ceremony").length;
    let meEvents = events.filter(x => x?.eventType === "Media Embed").length;

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
        <div style={{display: 'flex', flex: 1}}>

            <main style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                backgroundColor: ARMY_BLACK,
            }}>

                {/* Page header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}>
                    <div>
                        <h1 style={{fontSize: '22px', fontWeight: 600, color: WHITE, margin: 0}}>
                            HQ Dashboard
                        </h1>
                        <p style={{fontSize: '12px', color: MUTED, margin: '4px 0 0'}}>
                            1st Armored Division · All subordinate units
                        </p>
                    </div>
                </div>

                {/* Stat cards */}
                {/*todo refactor to allow user to manage what stats they see*/}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                    gap: '10px',
                    marginBottom: '20px',
                }}>
                    {[
                        {label: 'Total Events', value: events.length, sub: 'All types'},
                        {label: 'Submitted', value: submittedEvents, sub: 'Submitted', gold: true},
                        {label: 'Published', value: publishedEvents, sub: 'Published', green: true},
                        {label: 'In Progress', value: inProgressEvents, sub: 'Ongoing Projects'},
                        {label: 'Community Outreach', value: commOutreachEvents, sub: 'Community Outreach'},
                        {label: 'Press Conference', value: pressConferences, sub: 'Press Conference'},
                        {label: 'Training Exercise', value: trainingEvents, sub: 'Training Exercise'},
                        {label: 'Change of Command', value: cocEvents, sub: 'Change of Command'},
                        {label: 'Award Ceremony', value: acEvents, sub: 'Award Ceremony'},
                        {label: 'Media Embed', value: meEvents, sub: 'Media Embed'},
                        // Press Conference
                        // Community Outreach
                        // Media Embed
                        // Change of Command
                        // Award Ceremony
                        // Training Exercise

                    ].map(card => (
                        <div key={card.label} style={{
                            backgroundColor: SURFACE,
                            border: `1px solid ${BORDER}`,
                            borderRadius: '4px',
                            padding: '14px',
                        }}>
                            <div style={{
                                fontSize: '10px',
                                color: MUTED,
                                textTransform: 'uppercase',
                                letterSpacing: '0.08em',
                                marginBottom: '6px',
                            }}>
                                {card.label}
                            </div>
                            <div style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: card.gold ? ARMY_GOLD : card.green ? GREEN : WHITE,
                            }}>
                                {card.value}
                            </div>
                            <div style={{fontSize: '10px', color: MUTED, marginTop: '4px'}}>
                                {card.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Events table card */}
                {/*todo need filtering and sorting*/}
                <div style={{
                    backgroundColor: SURFACE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: '4px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderBottom: `1px solid ${BORDER}`,
                    }}>
                        <span style={{
                            fontSize: '12px',
                            fontWeight: 600,
                            color: WHITE,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                        }}>
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
                        <div style={{padding: '16px'}}>
                            {events.length === 0 ? (
                                <div style={{
                                    padding: '32px',
                                    textAlign: 'center',
                                    color: MUTED,
                                    fontSize: '13px',
                                }}>
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
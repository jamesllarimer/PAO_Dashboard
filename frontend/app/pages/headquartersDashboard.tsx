import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useState} from "react";
import ThemeForm from "../components/ThemeForm";
import type {EventResponseDto, User} from "~/types";
import EventGridRow from "~/components/EventGridRow";

const ARMY_BLACK = '#221F20';
const ARMY_GOLD = '#FFCC01';
const SURFACE = '#2a2728';
const SURFACE2 = '#332f30';
const BORDER = '#3f3b3c';
const BORDER2 = '#4f4b4c';
const MUTED = '#9a9496';
const WHITE = '#FFFFFF';
const GREEN = '#6db86d';

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting — HQ Dashboard"},
        {name: "description", content: "Division HQ dashboard"},
    ];
}

export default function HeadquartersDashboard() {
    const [showThemeForm, setShowThemeForm] = useState<boolean>(false);
    const [showSubordinateEvents, setShowSubordinateEvents] = useState<boolean>(true);
    const [events, setEvents] = useState<EventResponseDto[]> ([]);
    const [filteredEvents, setFilteredEvents] = useState<EventResponseDto[]>([]);

    let units = [...new Set(events.map(e => e.unit))]
    let submittedEvents = events.filter(x => x?.status === "Submitted").length;
    let publishedEvents = events.filter(x => x?.status === "Published").length;
    let ongoingEvents = events.filter(x => x?.status === "Ongoing").length;
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
               if( event?.status !== "Draft"){
                   return event;
            }
            });
            setEvents(filtered);
        } catch (error) {
            console.error(error);
        }
    }

    function filterEvents(selectedUnit: string) {
        let eventsFiltered = events.filter(x => x?.unit === selectedUnit)
        for (let event of eventsFiltered) {
            console.log(event);
        }
        if (eventsFiltered.length > 0) {
            setFilteredEvents(eventsFiltered);
        }

    }

    useEffect(() => {
        getAllEvents();
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
                        {label: 'Total Events', value: events.length, sub: 'All units'},
                        {label: 'Submitted', value: submittedEvents, sub: 'Submitted', gold: true},
                        {label: 'Published', value: publishedEvents, sub: 'Published', green: true},
                        {label: 'Ongoing', value: ongoingEvents, sub: 'Ongoing Projects'},
                        {label: 'Community Outreach', value: commOutreachEvents, sub: 'Community Outreach'},
                        {label: 'Press Conference', value: pressConferences, sub: 'Press Conference'},
                        {label: 'Training Exercise', value: trainingEvents, sub: 'Training Exercise'},
                        {label: 'Change of Command', value: cocEvents, sub: 'Change of Command'},
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
                        <select name="unitFilter" id="UnitFiler" onChange={e => filterEvents(e.target.value)} >
                            {units.map(unit => (<option value={unit}>{unit}</option>))}
                        </select>
                        <button
                            onClick={() => setShowSubordinateEvents(prev => !prev)}
                            style={{
                                background: 'transparent',
                                border: `1px solid ${ARMY_GOLD}`,
                                color: ARMY_GOLD,
                                padding: '5px 12px',
                                fontSize: '11px',
                                fontWeight: 600,
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}
                        >
                            {showSubordinateEvents ? 'Hide' : 'Show'}
                        </button>
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
                                    <EventGridRow key={event?.id} event={event}/>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
import type {Route} from "./+types/headquartersDashboard";
import {useEffect, useState} from "react";
import ThemeForm from "../components/ThemeForm";
import type {EventResponseDto, User} from "~/types";
import EventGridRow from "~/components/EventGridRow";

const ARMY_BLACK = '#221F20';
const ARMY_GOLD  = '#FFCC01';
const SURFACE    = '#2a2728';
const SURFACE2   = '#332f30';
const BORDER     = '#3f3b3c';
const BORDER2    = '#4f4b4c';
const MUTED      = '#9a9496';
const WHITE      = '#FFFFFF';
const GREEN      = '#6db86d';

export function meta({}: Route.MetaArgs) {
    return [
        {title: "PAO Reporting — HQ Dashboard"},
        {name: "description", content: "Division HQ dashboard"},
    ];
}

export default function HeadquartersDashboard() {
    const [showThemeForm, setShowThemeForm]                   = useState<boolean>(false);
    const [showSubordinateEvents, setShowSubordinateEvents]   = useState<boolean>(true);
    const [events, setEvents]                                 = useState<EventResponseDto[]>([]);

    async function getAllEvents() {
        try {
            const response = await fetch('http://localhost:8080/api/v1/events', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error(response.statusText);
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error(error);
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
                    <button
                        onClick={() => setShowThemeForm(prev => !prev)}
                        style={{
                            backgroundColor: ARMY_GOLD,
                            color: ARMY_BLACK,
                            border: 'none',
                            padding: '8px 16px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: '3px',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        }}
                    >
                        + Add Theme
                    </button>
                </div>

                {/* Stat cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                    gap: '10px',
                    marginBottom: '20px',
                }}>
                    {[
                        {label: 'Total Events',    value: events.length,    sub: 'All units'},
                        {label: 'Submitted',       value: '—',              sub: 'Awaiting review', gold: true},
                        {label: 'Acknowledged',    value: '—',              sub: 'Incorporated',    green: true},
                        {label: 'Units Reporting', value: '—',              sub: 'Active units'},
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

                {/* Theme form panel */}
                {showThemeForm && (
                    <div style={{
                        backgroundColor: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: '4px',
                        padding: '16px',
                        marginBottom: '16px',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px',
                            paddingBottom: '10px',
                            borderBottom: `1px solid ${BORDER}`,
                        }}>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: WHITE,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                            }}>
                                New Theme
                            </span>
                            <button
                                onClick={() => setShowThemeForm(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: MUTED,
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    lineHeight: 1,
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <ThemeForm/>
                    </div>
                )}

                {/* Events table card */}
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
                                events.map((event: EventResponseDto) => (
                                    <EventGridRow key={event.id} event={event}/>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
import {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import {useUserContext} from "~/context/UserProfileContext";
import type {User} from "~/types";

// ── Army brand tokens ──────────────────────────────────────────────
const C = {
    black: "#221F20",
    gold: "#FFCC01",
    white: "#FFFFFF",
    green: "#2F372F",
    surface: "#2a2728",
    surf2: "#332f30",
    border: "#3f3b3c",
    muted: "#9a9496",
    goldDim: "#b89000",
};

// ── Sub-components ─────────────────────────────────────────────────

function GoldRule() {
    return (
        <div style={{
            height: "2px",
            background: `linear-gradient(90deg, ${C.gold} 0%, ${C.goldDim} 60%, transparent 100%)`,
            marginBottom: "0",
        }}/>
    );
}

function SectionLabel({text}: { text: string }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "32px",
        }}>
            <div style={{
                width: "3px",
                height: "18px",
                background: C.gold,
                flexShrink: 0,
            }}/>
            <span style={{
                fontSize: "10px",
                fontWeight: 700,
                color: C.gold,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "'Barlow Condensed', sans-serif",
            }}>
        {text}
      </span>
        </div>
    );
}

function BenefitCard({
                         icon, title, items, delay
                     }: {
    icon: string; title: string; items: string[]; delay: number
}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <div style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderTop: `2px solid ${C.gold}`,
            padding: "28px 24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
        }}>
            <div style={{
                fontSize: "28px",
                marginBottom: "14px",
                lineHeight: 1,
            }}>{icon}</div>
            <div style={{
                fontSize: "14px",
                fontWeight: 700,
                color: C.white,
                marginBottom: "16px",
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
            }}>{title}</div>
            <ul style={{listStyle: "none", padding: 0, margin: 0}}>
                {items.map((item, i) => (
                    <li key={i} style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        marginBottom: "10px",
                        fontSize: "12px",
                        color: C.muted,
                        lineHeight: 1.6,
                    }}>
            <span style={{
                width: "4px",
                height: "4px",
                background: C.gold,
                borderRadius: "50%",
                flexShrink: 0,
                marginTop: "7px",
            }}/>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StepBlock({num, title, desc}: { num: string; title: string; desc: string }) {
    return (
        <div style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
        }}>
            <div style={{
                width: "40px",
                height: "40px",
                background: "transparent",
                border: `1px solid ${C.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                color: C.gold,
            }}>{num}</div>
            <div>
                <div style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: C.white,
                    marginBottom: "6px",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                }}>{title}</div>
                <div style={{
                    fontSize: "12px",
                    color: C.muted,
                    lineHeight: 1.6,
                }}>{desc}</div>
            </div>
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────────

export default function HomePage() {
    const {users, activeUser, setActiveUser} = useUserContext();
    const navigate = useNavigate();
    const [heroVisible, setHeroVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    function handleEnter() {
        if (!activeUser) return;
        if (activeUser.role === "HQ_VIEWER") {
            navigate("/hq/dashboard");
        } else {
            navigate("/pao/dashboard");
        }
    }

    return (
        <div style={{
            flex: 1,
            background: C.black,
            overflowY: "auto",
            fontFamily: "'Barlow', sans-serif",
        }}>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');

        .enter-btn:hover {
          background: #e6b800 !important;
        }
        .persona-card:hover {
          border-color: ${C.gold} !important;
          background: ${C.surf2} !important;
        }
        .persona-card.selected {
          border-color: ${C.gold} !important;
          background: ${C.surf2} !important;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-line-1 { animation: fadeSlideUp 0.6s ease 0.1s both; }
        .hero-line-2 { animation: fadeSlideUp 0.6s ease 0.25s both; }
        .hero-line-3 { animation: fadeSlideUp 0.6s ease 0.4s both; }
        .hero-sub    { animation: fadeSlideUp 0.6s ease 0.55s both; }
        .hero-cta    { animation: fadeSlideUp 0.6s ease 0.7s both; }

        @keyframes scanLine {
          0%   { opacity: 0.04; }
          50%  { opacity: 0.08; }
          100% { opacity: 0.04; }
        }
      `}</style>

            {/* ── Hero ───────────────────────────────────────────────── */}
            <div style={{
                position: "relative",
                overflow: "hidden",
                borderBottom: `1px solid ${C.border}`,
                padding: "72px 64px 64px",
            }}>

                {/* Grid overlay texture */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
            linear-gradient(${C.border}22 1px, transparent 1px),
            linear-gradient(90deg, ${C.border}22 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                    animation: "scanLine 4s ease-in-out infinite",
                }}/>


                <div style={{position: "relative", maxWidth: "900px"}}>

                    {/* Eyebrow */}
                    <div className="hero-line-1" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "24px",
                    }}>
                        <div style={{
                            width: "28px", height: "28px",
                            background: C.gold,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "10px", fontWeight: 800,
                            color: C.black,
                            letterSpacing: "0.05em",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}>PAO
                        </div>
                        <span style={{
                            fontSize: "11px",
                            color: C.muted,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontFamily: "'Barlow Condensed', sans-serif",
                        }}>
              Public Affairs · Subordinate → HQ Reporting
            </span>
                    </div>

                    <h1 className="hero-line-2" style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(48px, 6vw, 80px)",
                        fontWeight: 800,
                        lineHeight: 1.0,
                        color: C.white,
                        margin: "0 0 4px",
                        letterSpacing: "-0.01em",
                        textTransform: "uppercase",
                    }}>
                        Real-time PA
                    </h1>
                    <h1 className="hero-line-3" style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "clamp(48px, 6vw, 80px)",
                        fontWeight: 800,
                        lineHeight: 1.0,
                        color: C.gold,
                        margin: "0 0 28px",
                        letterSpacing: "-0.01em",
                        textTransform: "uppercase",
                    }}>
                        Reporting Platform
                    </h1>

                    <p className="hero-sub" style={{
                        fontSize: "16px",
                        color: C.muted,
                        maxWidth: "560px",
                        lineHeight: 1.7,
                        margin: "0 0 40px",
                        fontWeight: 300,
                    }}>
                        Replace the manual slide-deck workflow with a structured, data-driven reporting
                        tool that gives unit PAOs a clear submission process and gives Division HQ
                        real-time visibility across all subordinate units.
                    </p>

                    {/* CTA block */}
                    <div className="hero-cta" style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                    }}>
                        <div style={{display: "flex", flexDirection: "column", gap: "6px"}}>
                            <label style={{
                                fontSize: "9px",
                                color: C.muted,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                fontFamily: "'Barlow Condensed', sans-serif",
                            }}>
                                Select persona
                            </label>
                            <select
                                value={activeUser?.id ?? ""}
                                onChange={e => {
                                    const u = users?.find(u => String(u.id) === e.target.value);
                                    if (u) setActiveUser(u);
                                }}
                                style={{
                                    background: C.surface,
                                    border: `1px solid ${C.border}`,
                                    color: C.white,
                                    padding: "10px 14px",
                                    fontSize: "13px",
                                    borderRadius: "2px",
                                    outline: "none",
                                    cursor: "pointer",
                                    minWidth: "240px",
                                    fontFamily: "'Barlow', sans-serif",
                                }}
                            >
                                {users?.map((u: User) => (
                                    <option key={u.id} value={u.id}>
                                        {`${u.rankAbbreviation} ${u.lastName} — ${u.role === "HQ_VIEWER" ? "Division HQ" : "Unit PAO"}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{paddingTop: "20px"}}>
                            <button
                                className="enter-btn"
                                onClick={handleEnter}
                                style={{
                                    background: C.gold,
                                    color: C.black,
                                    border: "none",
                                    padding: "10px 28px",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    cursor: "pointer",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    borderRadius: "2px",
                                    transition: "background 0.15s",
                                }}
                            >
                                Get Started →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{
                padding: "64px",
                borderBottom: `1px solid ${C.border}`,
            }}>
                <SectionLabel text="The Problem"/>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    alignItems: "start",
                }}>
                    <div>
                        <h2 style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: C.white,
                            textTransform: "uppercase",
                            letterSpacing: "0.02em",
                            lineHeight: 1.1,
                            margin: "0 0 20px",
                        }}>
                            The current workflow is slow, fragmented, and manual
                        </h2>
                        <p style={{
                            fontSize: "13px",
                            color: C.muted,
                            lineHeight: 1.8,
                            margin: 0,
                        }}>
                            Every reporting cycle, Public Affairs Officers and NCOs at brigade level
                            are required to brief their higher headquarters on upcoming events, media
                            coverage plans, VIP visits, and the products they plan to produce.
                            Right now, this means updating a shared PowerPoint or Google Slide — then
                            presenting it at a briefing while HQ staff manually distills the information
                            into their own report.
                        </p>
                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                        {[
                            ["No real-time visibility", "HQ waits for a scheduled briefing to learn what units are working on. A lot can change between cycles."],
                            ["Inconsistent format", "Each unit structures their slide differently. Cross-unit comparison and trend analysis is practically impossible."],
                            ["Duplicated effort", "HQ staff manually reads every unit slide and rewrites the information into a separate Division report — every single cycle."],
                            ["No shared reference", "Units have no standardized access to command messaging priorities while planning coverage."],
                        ].map(([title, desc]) => (
                            <div key={title} style={{
                                display: "flex",
                                gap: "14px",
                                padding: "14px 16px",
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                borderLeft: `3px solid #8B2215`,
                            }}>
                                <div>
                                    <div style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: C.white,
                                        marginBottom: "4px",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                    }}>{title}</div>
                                    <div style={{
                                        fontSize: "11px",
                                        color: C.muted,
                                        lineHeight: 1.6,
                                    }}>{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Benefits ───────────────────────────────────────────── */}
            <div style={{
                padding: "64px",
                borderBottom: `1px solid ${C.border}`,
            }}>
                <SectionLabel text="Who benefits and how"/>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    marginBottom: "0",
                }}>

                    {/* PAO Unit column */}
                    <div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                            paddingBottom: "14px",
                            borderBottom: `1px solid ${C.border}`,
                        }}>
                            <div style={{
                                width: "8px", height: "8px",
                                borderRadius: "50%",
                                background: "#6db86d",
                                flexShrink: 0,
                            }}/>
                            <span style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#6db86d",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                fontFamily: "'Barlow Condensed', sans-serif",
                            }}>Unit PAO — SSG James, 1st Brigade</span>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                            {[
                                ["Structured submission", "Fill out a form instead of editing a shared slide. Every field is defined — name, description, coverage plan, lead, event type, dates."],
                                ["Command messaging guidance", "Browse HQ-published messaging themes and integration examples directly in the app while planning your coverage — no need to track down a separate reference doc."],
                                ["Your events, at a glance", "A personal dashboard shows your unit's upcoming events, status of submitted reports, and which items HQ has acknowledged."],
                                ["No more slide coordination", "Submit when you're ready. HQ sees it immediately. No waiting for a briefing slot."],
                            ].map(([title, desc]) => (
                                <div key={title} style={{
                                    padding: "12px 16px",
                                    background: C.surface,
                                    border: `1px solid ${C.border}`,
                                }}>
                                    <div style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: C.white,
                                        marginBottom: "4px",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                    }}>{title}</div>
                                    <div style={{fontSize: "11px", color: C.muted, lineHeight: 1.6}}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HQ Supervisor column */}
                    <div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "20px",
                            paddingBottom: "14px",
                            borderBottom: `1px solid ${C.border}`,
                        }}>
                            <div style={{
                                width: "8px", height: "8px",
                                borderRadius: "50%",
                                background: C.gold,
                                flexShrink: 0,
                            }}/>
                            <span style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: C.gold,
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                fontFamily: "'Barlow Condensed', sans-serif",
                            }}>Division HQ — MSG Bob, 1AD</span>
                        </div>

                        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                            {[
                                ["Real-time visibility", "See every unit's submitted events the moment they are entered — not just during a scheduled briefing."],
                                ["Filter and sort everything", "Slice the event feed by unit, status, date range, or event type. Find what you need instantly."],
                                ["Acknowledge and track", "Mark events as incorporated into Division reporting. Both you and the submitting unit can see the acknowledgment status."],
                                ["Manage themes and messaging", "Publish command messaging priorities with descriptions and integration examples. Units reference these while planning coverage — alignment improves without extra coordination."],
                            ].map(([title, desc]) => (
                                <div key={title} style={{
                                    padding: "12px 16px",
                                    background: C.surface,
                                    border: `1px solid ${C.border}`,
                                }}>
                                    <div style={{
                                        fontSize: "11px",
                                        fontWeight: 700,
                                        color: C.white,
                                        marginBottom: "4px",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.04em",
                                    }}>{title}</div>
                                    <div style={{fontSize: "11px", color: C.muted, lineHeight: 1.6}}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── How it works ───────────────────────────────────────── */}
            <div style={{
                padding: "64px",
                borderBottom: `1px solid ${C.border}`,
            }}>
                <SectionLabel text="How it works"/>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "32px",
                }}>
                    {[
                        ["01", "Unit PAO submits", "SSG James logs an upcoming event — fills in the name, type, coverage plan, lead, and dates. Selects applicable command messaging themes. Submits when ready."],
                        ["02", "HQ sees it immediately", "MSG Bob opens the HQ dashboard and sees the submission in real time alongside all other units. Filters by date, unit, or event type to focus on what matters."],
                        ["03", "HQ acknowledges", "Once an event is incorporated into Division reporting, MSG Bob marks it acknowledged. SSG James sees the confirmation on his unit dashboard."],
                    ].map(([num, title, desc]) => (
                        <StepBlock key={num} num={num} title={title} desc={desc}/>
                    ))}
                </div>

                {/* Connector line */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "32px",
                    marginTop: "16px",
                    paddingTop: "16px",
                    borderTop: `1px solid ${C.border}`,
                }}>
                    {["Unit PAO", "Division HQ", "Both roles"].map((label, i) => (
                        <div key={i} style={{
                            fontSize: "10px",
                            color: i === 2 ? C.muted : i === 0 ? "#6db86d" : C.gold,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            paddingLeft: "60px",
                        }}>{label}</div>
                    ))}
                </div>
            </div>

            {/* ── Tech stack strip ───────────────────────────────────── */}
            <div style={{
                padding: "32px 64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: `1px solid ${C.border}`,
                flexWrap: "wrap",
                gap: "16px",
            }}>
                <div style={{
                    fontSize: "10px",
                    color: C.muted,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'Barlow Condensed', sans-serif",
                }}>
                    Built with
                </div>
                <div style={{
                    display: "flex",
                    gap: "32px",
                    alignItems: "center",
                    flexWrap: "wrap",
                }}>
                    {["React + React Router", "Spring Boot", "PostgreSQL", "Flyway"].map(tech => (
                        <span key={tech} style={{
                            fontSize: "12px",
                            color: C.muted,
                            fontFamily: "'Barlow Condensed', sans-serif",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                        }}>{tech}</span>
                    ))}
                </div>
                <div style={{
                    fontSize: "10px",
                    color: C.muted,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.08em",
                }}>
                    Brigade → Division · 1st Armored Division
                </div>
            </div>

            {/* ── Bottom CTA ─────────────────────────────────────────── */}
            <div style={{
                padding: "64px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "24px",
            }}>
                <h2 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "36px",
                    fontWeight: 800,
                    color: C.white,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    margin: 0,
                }}>
                    Select a persona and explore the app
                </h2>
                <p style={{
                    fontSize: "13px",
                    color: C.muted,
                    maxWidth: "480px",
                    lineHeight: 1.7,
                    margin: 0,
                }}>
                    Experience the app as SSG James — a brigade PAO submitting events — or
                    as MSG Bob — a Division HQ supervisor reviewing reporting across all units.
                </p>
                <div style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}>
                    {users?.map((u: User) => (
                        <button
                            key={u.id}
                            className={`persona-card ${activeUser?.id === u.id ? "selected" : ""}`}
                            onClick={() => {
                                setActiveUser(u);
                                handleEnter();
                            }}
                            style={{
                                background: C.surface,
                                border: `1px solid ${u.id === activeUser?.id ? C.gold : C.border}`,
                                color: C.white,
                                padding: "14px 20px",
                                cursor: "pointer",
                                textAlign: "left",
                                minWidth: "200px",
                                transition: "all 0.15s",
                                borderRadius: "2px",
                            }}
                        >
                            <div style={{
                                fontSize: "9px",
                                color: u.role === "HQ_VIEWER" ? C.gold : "#6db86d",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                fontFamily: "'Barlow Condensed', sans-serif",
                                fontWeight: 700,
                                marginBottom: "6px",
                            }}>
                                {u.role === "HQ_VIEWER" ? "HQ Viewer" : "PAO Unit"}
                            </div>
                            <div style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                fontFamily: "'Barlow Condensed', sans-serif",
                                textTransform: "uppercase",
                                letterSpacing: "0.04em",
                            }}>
                                {u.rankAbbreviation} {u.lastName}
                            </div>
                            <div style={{
                                fontSize: "10px",
                                color: C.muted,
                                marginTop: "2px",
                            }}>
                                {u.unitName ?? u.role}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}
import {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import {useUserContext} from "~/context/UserProfileContext";
import type {User} from "~/types";

// ── Sub-components ─────────────────────────────────────────────────

function GoldRule() {
    return (
        <div
            className="h-[2px] mb-0"
            style={{background: 'linear-gradient(90deg, #FFCC01 0%, #b89000 60%, transparent 100%)'}}
        />
    );
}

function SectionLabel({text}: { text: string }) {
    return (
        <div className="flex items-center gap-[10px] mb-8">
            <div className="w-[3px] h-[18px] bg-army-gold shrink-0"/>
            <span className="text-[10px] font-bold text-army-gold tracking-[0.2em] uppercase font-barlow">
                {text}
            </span>
        </div>
    );
}

function BenefitCard({icon, title, items, delay}: {icon: string; title: string; items: string[]; delay: number}) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <div
            className="bg-surface border border-ui-border border-t-2 border-t-army-gold p-7 px-6"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
            }}
        >
            <div className="text-[28px] mb-[14px] leading-none">{icon}</div>
            <div className="text-sm font-bold text-white mb-4 uppercase tracking-[0.05em] font-barlow">{title}</div>
            <ul className="list-none p-0 m-0">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-[10px] mb-[10px] text-xs text-muted leading-[1.6]">
                        <span className="w-[4px] h-[4px] bg-army-gold rounded-full shrink-0 mt-[7px]"/>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function StepBlock({num, title, desc}: { num: string; title: string; desc: string }) {
    return (
        <div className="flex gap-5 items-start">
            <div className="w-10 h-10 bg-transparent border border-army-gold flex items-center justify-center shrink-0 text-[18px] font-bold text-army-gold font-barlow">
                {num}
            </div>
            <div>
                <div className="text-[13px] font-bold text-white mb-[6px] uppercase tracking-[0.06em] font-barlow">{title}</div>
                <div className="text-xs text-muted leading-[1.6]">{desc}</div>
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
            navigate(`/pao/dashboard/${activeUser.id}`);
        }
    }

    return (
        <div className="flex-1 bg-army-black overflow-y-auto font-barlow-sans">

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap');

        .enter-btn:hover {
          background: #e6b800 !important;
        }
        .persona-card:hover {
          border-color: var(--color-army-gold) !important;
          background: var(--color-surface-2) !important;
        }
        .persona-card.selected {
          border-color: var(--color-army-gold) !important;
          background: var(--color-surface-2) !important;
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
            <div className="relative overflow-hidden border-b border-ui-border pt-[72px] pb-16 px-16">

                {/* Grid overlay texture */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(#3f3b3c22 1px, transparent 1px),
                            linear-gradient(90deg, #3f3b3c22 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                        animation: "scanLine 4s ease-in-out infinite",
                    }}
                />

                <div className="relative max-w-[900px]">

                    {/* Eyebrow */}
                    <div className="hero-line-1 flex items-center gap-[10px] mb-6">
                        <div className="w-7 h-7 bg-army-gold flex items-center justify-center text-[10px] font-extrabold text-army-black tracking-[0.05em] font-barlow">
                            PAO
                        </div>
                        <span className="text-[11px] text-muted tracking-[0.15em] uppercase font-barlow">
                            Public Affairs · Subordinate → HQ Reporting
                        </span>
                    </div>

                    <h1
                        className="hero-line-2 font-barlow font-extrabold leading-none text-white m-0 mb-1 uppercase tracking-[-0.01em]"
                        style={{fontSize: "clamp(48px, 6vw, 80px)"}}
                    >
                        Real-time PA
                    </h1>
                    <h1
                        className="hero-line-3 font-barlow font-extrabold leading-none text-army-gold m-0 mb-7 uppercase tracking-[-0.01em]"
                        style={{fontSize: "clamp(48px, 6vw, 80px)"}}
                    >
                        Reporting Platform
                    </h1>

                    <p className="hero-sub text-base text-muted max-w-[560px] leading-[1.7] m-0 mb-10 font-light">
                        Replace the manual slide-deck workflow with a structured, data-driven reporting
                        tool that gives unit PAOs a clear submission process and gives Division HQ
                        real-time visibility across all subordinate units.
                    </p>

                    {/* CTA block */}
                    <div className="hero-cta flex items-center gap-4 flex-wrap">
                        <div className="flex flex-col gap-[6px]">
                            <label className="text-[9px] text-muted tracking-[0.15em] uppercase font-barlow">
                                Select persona
                            </label>
                            <select
                                value={activeUser?.id ?? ""}
                                onChange={e => {
                                    const u = users?.find(u => String(u.id) === e.target.value);
                                    if (u) setActiveUser(u);
                                }}
                                className="bg-surface border border-ui-border text-white py-[10px] px-[14px] text-[13px] rounded-[2px] outline-none cursor-pointer min-w-[240px] font-barlow-sans"
                            >
                                {users?.map((u: User) => (
                                    <option key={u.id} value={u.id}>
                                        {`${u.rankAbbreviation} ${u.lastName} — ${u.role === "HQ_VIEWER" ? "Division HQ" : "Unit PAO"}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="pt-5">
                            <button
                                className="enter-btn bg-army-gold text-army-black border-none py-[10px] px-7 text-[13px] font-bold tracking-[0.08em] uppercase cursor-pointer font-barlow rounded-[2px] transition-colors duration-[150ms]"
                                onClick={handleEnter}
                            >
                                Get Started →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── The Problem ─────────────────────────────────────────── */}
            <div className="p-16 border-b border-ui-border">
                <SectionLabel text="The Problem"/>

                <div className="grid grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="font-barlow text-[32px] font-bold text-white uppercase tracking-[0.02em] leading-[1.1] m-0 mb-5">
                            The current workflow is slow, fragmented, and manual
                        </h2>
                        <p className="text-[13px] text-muted leading-[1.8] m-0">
                            Every reporting cycle, Public Affairs Officers and NCOs at brigade level
                            are required to brief their higher headquarters on upcoming events, media
                            coverage plans, VIP visits, and the products they plan to produce.
                            Right now, this means updating a shared PowerPoint or Google Slide — then
                            presenting it at a briefing while HQ staff manually distills the information
                            into their own report.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {[
                            ["No real-time visibility", "HQ waits for a scheduled briefing to learn what units are working on. A lot can change between cycles."],
                            ["Inconsistent format", "Each unit structures their slide differently. Cross-unit comparison and trend analysis is practically impossible."],
                            ["Duplicated effort", "HQ staff manually reads every unit slide and rewrites the information into a separate Division report — every single cycle."],
                            ["No shared reference", "Units have no standardized access to command messaging priorities while planning coverage."],
                        ].map(([title, desc]) => (
                            <div key={title} className="flex gap-[14px] py-[14px] px-4 bg-surface border border-ui-border border-l-[3px] border-l-[#8B2215]">
                                <div>
                                    <div className="text-[11px] font-bold text-white mb-1 uppercase tracking-[0.05em] font-barlow">{title}</div>
                                    <div className="text-[11px] text-muted leading-[1.6]">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Benefits ───────────────────────────────────────────── */}
            <div className="p-16 border-b border-ui-border">
                <SectionLabel text="Who benefits and how"/>

                <div className="grid grid-cols-2 gap-12">

                    {/* PAO Unit column */}
                    <div>
                        <div className="flex items-center gap-[10px] mb-5 pb-[14px] border-b border-ui-border">
                            <div className="w-2 h-2 rounded-full bg-army-green shrink-0"/>
                            <span className="text-[11px] font-bold text-army-green tracking-[0.12em] uppercase font-barlow">
                                Unit PAO — SSG James, 1st Brigade
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {[
                                ["Structured submission", "Fill out a form instead of editing a shared slide. Every field is defined — name, description, coverage plan, lead, event type, dates."],
                                ["Command messaging guidance", "Browse HQ-published messaging themes and integration examples directly in the app while planning your coverage — no need to track down a separate reference doc."],
                                ["Your events, at a glance", "A personal dashboard shows your unit's upcoming events, status of submitted reports, and which items HQ has acknowledged."],
                                ["No more slide coordination", "Submit when you're ready. HQ sees it immediately. No waiting for a briefing slot."],
                            ].map(([title, desc]) => (
                                <div key={title} className="py-3 px-4 bg-surface border border-ui-border">
                                    <div className="text-[11px] font-bold text-white mb-1 uppercase tracking-[0.04em] font-barlow">{title}</div>
                                    <div className="text-[11px] text-muted leading-[1.6]">{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HQ Supervisor column */}
                    <div>
                        <div className="flex items-center gap-[10px] mb-5 pb-[14px] border-b border-ui-border">
                            <div className="w-2 h-2 rounded-full bg-army-gold shrink-0"/>
                            <span className="text-[11px] font-bold text-army-gold tracking-[0.12em] uppercase font-barlow">
                                Division HQ — MSG Bob, 1AD
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {[
                                ["Real-time visibility", "See every unit's submitted events the moment they are entered — not just during a scheduled briefing."],
                                ["Filter and sort everything", "Slice the event feed by unit, status, date range, or event type. Find what you need instantly."],
                                ["Acknowledge and track", "Mark events as incorporated into Division reporting. Both you and the submitting unit can see the acknowledgment status."],
                                ["Manage themes and messaging", "Publish command messaging priorities with descriptions and integration examples. Units reference these while planning coverage — alignment improves without extra coordination."],
                            ].map(([title, desc]) => (
                                <div key={title} className="py-3 px-4 bg-surface border border-ui-border">
                                    <div className="text-[11px] font-bold text-white mb-1 uppercase tracking-[0.04em] font-barlow">{title}</div>
                                    <div className="text-[11px] text-muted leading-[1.6]">{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── How it works ───────────────────────────────────────── */}
            <div className="p-16 border-b border-ui-border">
                <SectionLabel text="How it works"/>

                <div className="grid grid-cols-3 gap-8">
                    {[
                        ["01", "Unit PAO submits", "SSG James logs an upcoming event — fills in the name, type, coverage plan, lead, and dates. Selects applicable command messaging themes. Submits when ready."],
                        ["02", "HQ sees it immediately", "MSG Bob opens the HQ dashboard and sees the submission in real time alongside all other units. Filters by date, unit, or event type to focus on what matters."],
                        ["03", "HQ acknowledges", "Once an event is incorporated into Division reporting, MSG Bob marks it acknowledged. SSG James sees the confirmation on his unit dashboard."],
                    ].map(([num, title, desc]) => (
                        <StepBlock key={num} num={num} title={title} desc={desc}/>
                    ))}
                </div>

                {/* Role labels */}
                <div className="grid grid-cols-3 gap-8 mt-4 pt-4 border-t border-ui-border">
                    {["Unit PAO", "Division HQ", "Both roles"].map((label, i) => (
                        <div
                            key={i}
                            className={`text-[10px] tracking-[0.1em] uppercase font-barlow font-bold pl-[60px] ${
                                i === 2 ? 'text-muted' : i === 0 ? 'text-army-green' : 'text-army-gold'
                            }`}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Tech stack strip ───────────────────────────────────── */}
            <div className="py-8 px-16 flex items-center justify-between border-b border-ui-border flex-wrap gap-4">
                <div className="text-[10px] text-muted tracking-[0.12em] uppercase font-barlow">
                    Built with
                </div>
                <div className="flex gap-8 items-center flex-wrap">
                    {["React + React Router", "Spring Boot", "PostgreSQL", "Flyway"].map(tech => (
                        <span key={tech} className="text-xs text-muted font-barlow tracking-[0.06em] uppercase font-semibold">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="text-[10px] text-muted font-barlow tracking-[0.08em]">
                    Brigade → Division · 1st Armored Division
                </div>
            </div>

            {/* ── Bottom CTA ─────────────────────────────────────────── */}
            <div className="p-16 flex flex-col items-center text-center gap-6">
                <h2 className="font-barlow text-4xl font-extrabold text-white uppercase tracking-[0.02em] m-0">
                    Select a persona and explore the app
                </h2>
                <p className="text-[13px] text-muted max-w-[480px] leading-[1.7] m-0">
                    Experience the app as SSG James — a brigade PAO submitting events — or
                    as MSG Bob — a Division HQ supervisor reviewing reporting across all units.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                    {users?.map((u: User) => (
                        <button
                            key={u.id}
                            className={`persona-card bg-surface text-white py-[14px] px-5 cursor-pointer text-left min-w-[200px] transition-all duration-[150ms] rounded-[2px] border ${
                                u.id === activeUser?.id ? 'border-army-gold selected' : 'border-ui-border'
                            }`}
                            onClick={() => {
                                setActiveUser(u);
                                handleEnter();
                            }}
                        >
                            <div className={`text-[9px] tracking-[0.12em] uppercase font-barlow font-bold mb-[6px] ${
                                u.role === "HQ_VIEWER" ? 'text-army-gold' : 'text-army-green'
                            }`}>
                                {u.role === "HQ_VIEWER" ? "HQ Viewer" : "PAO Unit"}
                            </div>
                            <div className="text-sm font-semibold font-barlow uppercase tracking-[0.04em]">
                                {u.rankAbbreviation} {u.lastName}
                            </div>
                            <div className="text-[10px] text-muted mt-[2px]">
                                {u.unitName ?? u.role}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}

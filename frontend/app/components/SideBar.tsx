import {NavLink} from "react-router";
import {useUserContext} from "~/context/UserProfileContext";

const ARMY_GOLD = '#FFCC01';
const SURFACE   = '#2a2728';
const SURFACE2  = '#332f30';
const BORDER    = '#3f3b3c';
const BORDER2   = '#4f4b4c';
const MUTED     = '#9a9496';
const WHITE     = '#FFFFFF';

const PAO_NAV = [
    {to: '/pao/dashboard',  label: 'Dashboard'},
    {to: '/pao/events/new', label: 'New Event'},
    {to: '/pao/events',     label: 'My Events'},
    {to: '/pao/themes',     label: 'Themes Reference'},
];

const HQ_NAV = [
    {to: '/hq/dashboard',  label: 'Dashboard'},
    {to: '/hq/events',     label: 'All Events'},
    {to: '/hq/themes',     label: 'Themes'},
    {to: '/hq/units',      label: 'Units & Users'},
    {to: '/hq/lookups',    label: 'Manage Lookups'},
];

export default function Sidebar() {
    const {activeUser, users, setActiveUser} = useUserContext();

    const isHQ  = activeUser?.role === 'HQ_VIEWER';
    const navItems = isHQ ? HQ_NAV : PAO_NAV;
    const sectionLabel = isHQ ? 'HQ Admin' : 'PAO Unit';

    const linkStyle = ({isActive}: {isActive: boolean}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        background: 'none',
        border: 'none',
        borderLeft: `3px solid ${isActive ? ARMY_GOLD : 'transparent'}`,
        color: isActive ? ARMY_GOLD : MUTED,
        backgroundColor: isActive ? SURFACE2 : 'transparent',
        fontSize: '12px',
        cursor: 'pointer',
        width: '100%',
        textDecoration: 'none',
        textAlign: 'left' as const,
        transition: 'all 0.15s',
    });

    return (
        <aside style={{
            width: '200px',
            backgroundColor: SURFACE,
            borderRight: `1px solid ${BORDER}`,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
        }}>

            {/* User switcher */}
            <div style={{padding: '12px', borderBottom: `1px solid ${BORDER}`}}>
                <label style={{
                    display: 'block',
                    fontSize: '9px',
                    color: MUTED,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                }}>
                    Active User
                </label>
                <select
                    value={activeUser?.id ?? ''}
                    onChange={e => {
                        const selected = users?.find(u => String(u.id) === e.target.value);
                        if (selected) {
                            setActiveUser(selected);
                            localStorage.setItem("selectedUserId", selected.id.toString())
                        }
                    }}
                    style={{
                        width: '100%',
                        backgroundColor: SURFACE2,
                        border: `1px solid ${BORDER2}`,
                        color: WHITE,
                        padding: '6px 8px',
                        fontSize: '11px',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {users?.map(user => (
                        <option key={user.id} value={user.id}>
                            {`${user.rankAbbreviation} ${user.lastName} — ${user.role}`}
                        </option>
                    ))}
                </select>

                {/* Role indicator */}
                <div style={{
                    marginTop: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                }}>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: isHQ ? ARMY_GOLD : '#6db86d',
                        flexShrink: 0,
                    }}/>
                    <span style={{fontSize: '10px', color: MUTED}}>
                        {isHQ ? 'HQ Viewer' : 'PAO Unit'} · {activeUser?.unitName ?? ''}
                    </span>
                </div>
            </div>

            {/* Nav items */}
            <div style={{padding: '12px 0', flex: 1}}>
                <div style={{
                    fontSize: '9px',
                    color: MUTED,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0 14px 6px',
                }}>
                    {sectionLabel}
                </div>
            {/*todo this generates nav links right now but we may want to have a link that just shows or hides a form or something like that*/}
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        style={linkStyle}
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>

            {/* Bottom — app info */}
            <div style={{
                padding: '10px 14px',
                borderTop: `1px solid ${BORDER}`,
                fontSize: '10px',
                color: MUTED,
            }}>
                PA Reporting · Brigade → Division
            </div>
        </aside>
    );
}
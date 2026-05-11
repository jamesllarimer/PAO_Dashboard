import {NavLink} from "react-router";
import {useUserContext} from "~/context/UserProfileContext";




export default function Sidebar() {
    const {activeUser, users, setActiveUser} = useUserContext();
    const PAO_NAV = [
        {to: '/pao/events/new', label: 'New Event'},
        {to: `/pao/dashboard/${activeUser?.id}`,   label: 'My Events'},
        {to: '/pao/themes',     label: 'Themes'},
    ];
    const HQ_NAV = [
        {to: '/hq/dashboard', label: 'All Events'},
        {to: '/pao/themes',   label: 'Themes'},
    ];
    const isHQ       = activeUser?.role === 'HQ_VIEWER';
    const navItems   = isHQ ? HQ_NAV : PAO_NAV;
    const sectionLabel = isHQ ? 'HQ Admin' : 'PAO Unit';

    const linkCls = ({isActive}: {isActive: boolean}) =>
        `flex items-center py-2 px-[14px] text-xs cursor-pointer w-full no-underline text-left transition-all duration-[150ms] border-l-[3px] ${
            isActive
                ? 'border-l-army-gold text-army-gold bg-surface-2'
                : 'border-l-transparent text-muted bg-transparent'
        }`;

    return (
        <aside className="w-[200px] bg-surface border-r border-ui-border shrink-0 flex flex-col min-h-full">

            {/* User switcher */}
            <div className="p-3 border-b border-ui-border">
                <label className="block text-[9px] text-muted uppercase tracking-[0.1em] mb-1.5">
                    Active User
                </label>
                <select
                    value={activeUser?.id ?? ''}
                    onChange={e => {
                        const selected = users?.find(u => String(u.id) === e.target.value);
                        if (selected) {
                            setActiveUser(selected);
                            localStorage.setItem("selectedUserId", selected.id.toString());
                        }
                    }}
                    className="w-full bg-surface-2 border border-ui-border-2 text-white py-[6px] px-2 text-[11px] rounded-[3px] outline-none cursor-pointer"
                >
                    {users?.map(user => (
                        <option key={user.id} value={user.id}>
                            {`${user.rankAbbreviation} ${user.lastName} — ${user.role}`}
                        </option>
                    ))}
                </select>

                {/* Role indicator */}
                <div className="mt-2 flex items-center gap-[6px]">
                    <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${isHQ ? 'bg-army-gold' : 'bg-army-green'}`}/>
                    <span className="text-[10px] text-muted">
                        {isHQ ? 'HQ Viewer' : 'PAO Unit'} · {activeUser?.unitName ?? ''}
                    </span>
                </div>
            </div>

            {/* Nav items */}
            <div className="py-3 flex-1">
                <div className="text-[9px] text-muted tracking-[0.12em] uppercase px-[14px] pb-[6px]">
                    {sectionLabel}
                </div>
                {/*todo this generates nav links right now but we may want to have a link that just shows or hides a form or something like that*/}
                {navItems.map(item => (
                    <NavLink key={item.to} to={item.to} className={linkCls}>
                        {item.label}
                    </NavLink>
                ))}
            </div>

            {/* Bottom — app info */}
            <div className="px-[14px] py-[10px] border-t border-ui-border text-[10px] text-muted">
                PA Reporting · Brigade → Division
            </div>
        </aside>
    );
}

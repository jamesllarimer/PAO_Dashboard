import {useUserContext} from '~/context/UserProfileContext';
import type {User} from '~/types';

const ARMY_BLACK = '#221F20';
const ARMY_GOLD = '#FFCC01';
const BORDER = '#3f3b3c';
const MUTED = '#9a9496';

export default function NavBar() {
    const {users, setUsers} = useUserContext();

    const handleProfileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        // Update active user in context — wire to your context's setActiveUser if available
        console.log('Switched to user id:', selectedId);
    };

    return (
        <header style={{
            backgroundColor: ARMY_BLACK,
            borderBottom: `1px solid ${ARMY_GOLD}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            height: '48px',
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            {/* Left — logo and app title */}
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: ARMY_GOLD,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 700,
                    color: ARMY_BLACK,
                    letterSpacing: '0.05em',
                    flexShrink: 0,
                }}>
                    PAO
                </div>
                <div>
                    <div style={{fontSize: '13px', fontWeight: 600, color: '#FFFFFF', letterSpacing: '0.08em', textTransform: 'uppercase'}}>
                        PA0 Reporting
                    </div>
                    <div style={{fontSize: '10px', color: MUTED, letterSpacing: '0.05em', textTransform: 'uppercase'}}>
                        Brigade → Division
                    </div>
                </div>
            </div>

            {/* Right — persona switcher */}
            <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <label style={{fontSize: '11px', color: MUTED, textTransform: 'uppercase', letterSpacing: '0.07em'}}>
                    Active user
                </label>
                <select
                    onChange={handleProfileChange}
                    style={{
                        backgroundColor: '#2a2728',
                        border: `1px solid ${BORDER}`,
                        color: '#FFFFFF',
                        padding: '5px 10px',
                        fontSize: '12px',
                        borderRadius: '3px',
                        outline: 'none',
                        cursor: 'pointer',
                    }}
                >
                    {users?.map((user: User) => (
                        <option key={user.id} value={user.id}>
                            {`${user.rankAbbreviation} ${user.lastName} — ${user.role}`}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}
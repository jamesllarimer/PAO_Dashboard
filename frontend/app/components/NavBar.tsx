import {useUserContext} from '~/context/UserProfileContext';
import type {User} from '~/types';

const ARMY_BLACK = '#221F20';
const ARMY_GOLD = '#FFCC01';
const BORDER = '#3f3b3c';
const MUTED = '#9a9496';

export default function NavBar() {
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
        </header>
    );
}
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { CURRENT_USER } from '../utils/mockData'
import XPBar from './XPBar'

// ── Nav item config ───────────────────────────────────────────────
const NAV_ITEMS = [
  { path: '/',        icon: '🏠', label: 'FEED'    },
  { path: '/arena',   icon: '⚔️', label: 'ARENA'   },
  { path: '/create',  icon: null, label: 'CREATE'  },
  { path: '/profile', icon: '👤', label: 'PROFILE' },
  { path: '/#alerts', icon: '🔔', label: 'ALERTS'  },
]

// ── Desktop sidebar (md+) ─────────────────────────────────────────
function DesktopSidebar({ location, navigate, user }) {
  return (
    <aside
      className="hidden md:flex flex-col fixed top-0 left-0 h-full z-50 w-56"
      style={{
        background:   '#0F1221',
        borderRight:  '1px solid rgba(124,58,237,0.18)',
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b border-t4/30">
        <h1
          className="font-chk text-[22px] font-bold tracking-[3px] cursor-pointer text-logo"
          onClick={() => navigate('/')}
        >
          ECHO<br />FIGHT
        </h1>
        <p className="font-mono text-[8px] text-t3 tracking-[1.5px] mt-1">⚔️ DEBATE ARENA</p>
      </div>

      {/* XP + rank */}
      <div className="px-4 py-3 border-b border-t4/20">
        <XPBar xp={user.xp} xpToNext={user.xpToNext} rank={user.rank} compact />
      </div>

      {/* Win streak */}
      {user.winStreak >= 3 && (
        <div
          className="mx-3 mt-3 rounded-xl px-3 py-2 flex items-center gap-2"
          style={{ background: 'rgba(255,104,32,0.1)', border: '1px solid rgba(255,104,32,0.22)' }}
        >
          <motion.span
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          >
            🔥
          </motion.span>
          <div>
            <div className="font-chk text-[10px] font-bold" style={{ color: '#FF8A50' }}>Win Streak!</div>
            <div className="font-mono text-[9px] text-t3">{user.winStreak} wins in a row</div>
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav className="flex-1 px-3 pt-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          if (item.label === 'CREATE') {
            return (
              <motion.button
                key="create"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-chk text-[11px] font-bold tracking-wide text-white"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#0099CC)', boxShadow: '0 0 16px rgba(124,58,237,0.35)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/create')}
              >
                <span>➕</span> START BATTLE
              </motion.button>
            )
          }

          const isActive = location.pathname === item.path && item.label !== 'ALERTS'
          return (
            <motion.button
              key={item.label}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-chk text-[11px] font-semibold tracking-wide transition-all"
              style={isActive
                ? { background: 'rgba(124,58,237,0.18)', color: '#00CFFF', border: '1px solid rgba(124,58,237,0.3)' }
                : { color: '#5A6685', border: '1px solid transparent' }
              }
              whileHover={!isActive ? { background: 'rgba(255,255,255,0.04)', color: '#BEC8E4' } : {}}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(item.path)}
            >
              <span className="text-base" style={{ filter: isActive ? 'none' : 'grayscale(0.4) opacity(0.6)' }}>
                {item.icon}
              </span>
              {item.label}
            </motion.button>
          )
        })}
      </nav>

      {/* User profile */}
      <div
        className="px-4 py-4 border-t border-t4/20 flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('/profile')}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
          style={{ background: 'rgba(124,58,237,0.15)', border: '2px solid #A855F7' }}
        >
          {user.avatar}
        </div>
        <div className="min-w-0">
          <div className="font-chk text-[11px] font-bold text-t1 truncate">{user.username}</div>
          <div className="font-mono text-[9px] text-t3">{user.xp.toLocaleString()} XP</div>
        </div>
      </div>
    </aside>
  )
}

// ── Mobile top bar (< md) ─────────────────────────────────────────
function MobileTopBar({ navigate, user }) {
  return (
    <div className="md:hidden">
      {/* XP bar */}
      <XPBar xp={user.xp} xpToNext={user.xpToNext} rank={user.rank} compact />

      {/* Win streak */}
      {user.winStreak >= 3 && (
        <div
          className="flex items-center gap-2 px-3 py-1.5"
          style={{
            background:   'linear-gradient(90deg, rgba(255,104,32,0.12), rgba(240,21,107,0.08), transparent)',
            borderBottom: '1px solid rgba(255,104,32,0.2)',
          }}
        >
          <motion.span
            className="text-lg"
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          >
            🔥
          </motion.span>
          <span className="font-chk text-[11px] font-bold flex-1" style={{ color: '#FF8A50' }}>
            You're on a win streak!
          </span>
          <span className="font-mono text-lg font-black" style={{ color: '#FF6820', textShadow: '0 0 10px rgba(255,104,32,0.6)' }}>
            {user.winStreak}
            <span className="font-chk text-[8px] text-t3 ml-0.5">WINS</span>
          </span>
        </div>
      )}

      {/* Logo bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: '#0F1221', borderBottom: '1px solid rgba(124,58,237,0.2)' }}
      >
        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: '#141829', border: '1px solid rgba(255,255,255,0.06)' }}
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate('/')}
        >
          ☰
        </motion.button>
        <h1 className="font-chk text-[20px] font-bold tracking-[3px] text-logo">ECHOFIGHT</h1>
        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm relative"
          style={{ background: '#141829', border: '1px solid rgba(255,255,255,0.06)' }}
          whileTap={{ scale: 0.92 }}
        >
          🔔
          <motion.span
            className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500 border border-s1"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.button>
      </div>
    </div>
  )
}

// ── Mobile bottom tab bar (< md) ──────────────────────────────────
function MobileBottomNav({ location, navigate }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex"
      style={{
        background:    '#0F1221',
        borderTop:     '1px solid rgba(124,58,237,0.18)',
        paddingBottom: 'env(safe-area-inset-bottom, 10px)',
      }}
    >
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), #00CFFF, rgba(124,58,237,0.5), transparent)' }}
      />
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path && item.label !== 'ALERTS'
        const isCreate = item.label === 'CREATE'
        if (isCreate) {
          return (
            <div key="create" className="flex-1 flex items-center justify-center" style={{ paddingTop: '6px', paddingBottom: '12px' }}>
              <motion.button
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #0099CC)',
                  boxShadow:  '0 0 20px rgba(124,58,237,0.5), 0 4px 12px rgba(0,0,0,0.4)',
                  marginTop:  '-20px',
                }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/create')}
              >
                ＋
              </motion.button>
            </div>
          )
        }
        return (
          <motion.button
            key={item.label}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 relative pt-1.5 pb-3"
            whileTap={{ scale: 0.93 }}
            onClick={() => navigate(item.path)}
          >
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute top-0 inset-x-1/4 h-0.5 rounded-b"
                style={{ background: 'linear-gradient(90deg, #7C3AED, #00CFFF)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="text-lg" style={{ filter: isActive ? 'none' : 'grayscale(1) opacity(0.35)' }}>
              {item.icon}
            </span>
            <span className="font-chk text-[8px] font-semibold tracking-[0.5px]" style={{ color: isActive ? '#00CFFF' : '#2E3650' }}>
              {item.label}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}

// ── Desktop top bar (md+) ─────────────────────────────────────────
function DesktopTopBar({ navigate }) {
  return (
    <div
      className="hidden md:flex items-center justify-between px-6 py-3 sticky top-0 z-40"
      style={{ background: 'rgba(10,12,22,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(124,58,237,0.12)' }}
    >
      <div />
      <motion.button
        className="w-8 h-8 rounded-full flex items-center justify-center relative"
        style={{ background: '#141829', border: '1px solid rgba(255,255,255,0.06)' }}
        whileTap={{ scale: 0.92 }}
      >
        🔔
        <motion.span
          className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500 border border-s1"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.button>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────
export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user     = CURRENT_USER

  return (
    <>
      <DesktopSidebar location={location} navigate={navigate} user={user} />

      <div className="sticky top-0 z-50 md:hidden">
        <MobileTopBar navigate={navigate} user={user} />
      </div>

      <DesktopTopBar navigate={navigate} />

      <MobileBottomNav location={location} navigate={navigate} />
    </>
  )
}

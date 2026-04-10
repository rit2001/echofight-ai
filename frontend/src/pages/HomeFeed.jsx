import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import DebateCard from '../components/DebateCard'
import { useXPToast } from '../hooks/useDebate'
import { DEBATES, TOP_DEBATERS } from '../utils/mockData'

// ── Pill strip ────────────────────────────────────────────────────
function PillStrip({ active, onSelect }) {
  const pills = [
    { id: 'controversial', label: '🔥 Most Controversial' },
    { id: 'top',           label: '🏆 Top Debaters'       },
    { id: 'live',          label: '⚡ Live Battles'        },
    { id: 'quick',         label: '⚡ Quick Match'         },
  ]
  const colors = {
    controversial: { bg: 'rgba(255,104,32,0.1)',  border: 'rgba(255,104,32,0.3)',  color: '#FF8A50' },
    top:           { bg: 'rgba(255,180,0,0.08)',   border: 'rgba(255,180,0,0.25)',  color: '#FFB400' },
    live:          { bg: 'rgba(0,207,255,0.08)',   border: 'rgba(0,207,255,0.28)',  color: '#00CFFF' },
    quick:         { bg: 'rgba(240,21,107,0.08)',  border: 'rgba(240,21,107,0.25)', color: '#FF5EA0' },
  }
  return (
    <div className="flex gap-2 px-3 py-2.5 overflow-x-auto scrollbar-hide"
      style={{ background: '#0A0C16', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      {pills.map((p) => {
        const c = colors[p.id]
        return (
          <motion.button
            key={p.id}
            className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-chk text-[11px] font-bold tracking-wide border"
            style={active === p.id
              ? { background: 'rgba(124,58,237,0.18)', borderColor: 'rgba(124,58,237,0.45)', color: '#A855F7' }
              : { background: c.bg, borderColor: c.border, color: c.color }
            }
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(p.id)}
          >
            {p.id === 'live' && (
              <motion.span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"
                animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
            )}
            {p.label}
          </motion.button>
        )
      })}
    </div>
  )
}

// ── Top debater card ──────────────────────────────────────────────
const RING = {
  gold:   { border: '#FFB400', shadow: 'rgba(255,180,0,0.35)',   bg: 'rgba(255,180,0,0.1)'   },
  blue:   { border: '#00CFFF', shadow: 'rgba(0,207,255,0.3)',    bg: 'rgba(0,207,255,0.08)'  },
  purple: { border: '#A855F7', shadow: 'rgba(168,85,247,0.28)',  bg: 'rgba(168,85,247,0.08)' },
  pink:   { border: '#F0156B', shadow: 'rgba(240,21,107,0.28)', bg: 'rgba(240,21,107,0.08)' },
}
function DebaterCard({ debater, index }) {
  const rc = RING[debater.ringColor] ?? RING.blue
  return (
    <motion.div
      className="flex-shrink-0 w-[76px] md:w-auto md:flex-1 rounded-xl p-2.5 text-center cursor-pointer"
      style={{ background: '#141829', border: '1px solid #2E3650' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      whileHover={{ scale: 0.97, borderColor: rc.border }}
      whileTap={{ scale: 0.94 }}
    >
      <div className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[17px] md:text-2xl mx-auto mb-1.5"
        style={{ background: rc.bg, border: `2px solid ${rc.border}`, boxShadow: `0 0 10px ${rc.shadow}` }}>
        {debater.avatar}
      </div>
      <div className="font-chk text-[9px] md:text-[10px] font-bold text-t2 truncate">{debater.username}</div>
      <div className="font-mono text-[8px] text-t3 mt-0.5">{debater.wins}W·{debater.losses}L</div>
    </motion.div>
  )
}

// ── Streak banner ─────────────────────────────────────────────────
function StreakBanner({ onJoin }) {
  return (
    <motion.div
      className="mx-3 md:mx-0 mb-3 rounded-xl p-3 flex items-center gap-3"
      style={{ background: 'linear-gradient(90deg,rgba(255,104,32,0.12),rgba(240,21,107,0.08),transparent)', border: '1px solid rgba(255,104,32,0.25)' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.span className="text-2xl" animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}>🔥</motion.span>
      <div className="flex-1">
        <div className="font-chk text-[12px] font-bold" style={{ color: '#FF8A50' }}>You're on a 5-win streak!</div>
        <div className="font-mono text-[10px] text-t3">Most destroyed argument today</div>
      </div>
      <motion.button
        className="px-3 py-1.5 rounded-full font-chk text-[10px] font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#FF2D7B,#7C3AED)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onJoin}
      >
        Defend ⚔️
      </motion.button>
    </motion.div>
  )
}

// ── XP toast ─────────────────────────────────────────────────────
function XPToast({ toast }) {
  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          key={toast.key}
          className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 rounded-full font-chk text-[12px] font-bold whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg,rgba(0,230,118,0.9),rgba(0,200,100,0.9))', color: '#06080F', boxShadow: '0 4px 20px rgba(0,230,118,0.4)', letterSpacing: '1px' }}
          initial={{ opacity: 0, y: 16, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        >
          ⚡ {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main ──────────────────────────────────────────────────────────
export default function HomeFeed() {
  const [activeFilter, setActiveFilter] = useState('controversial')
  const { toast, showToast }            = useXPToast()
  const navigate                        = useNavigate()

  const handleJoin = (debate) => showToast(`+${debate.xpReward} XP — BATTLE JOINED!`)

  return (
    <div className="ambient-bg min-h-screen">
      <PillStrip active={activeFilter} onSelect={setActiveFilter} />

      {/* Responsive content wrapper */}
      <div className="page-container">

        {/* Desktop: two-column grid | Mobile: single column */}
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-6 lg:items-start">

          {/* LEFT: main feed */}
          <div>
            <StreakBanner onJoin={() => navigate('/arena')} />

            <div className="section-header mt-1">
              <span className="section-title">⚔️ Active Battles</span>
              <span className="section-link">See All →</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                /* Desktop: 2-col card grid on xl */
                className="xl:grid xl:grid-cols-2 xl:gap-3"
              >
                {DEBATES.map((debate, i) => (
                  <DebateCard key={debate.id} debate={debate} index={i} onJoin={handleJoin} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: top debaters panel (desktop only) */}
          <div className="hidden lg:block">
            {/* Sticky sidebar panel */}
            <div className="sticky top-16">
              <div className="glass-card p-4 mb-4">
                <div className="section-header mb-3">
                  <span className="section-title">🏆 Top Debaters</span>
                  <span className="section-link">All →</span>
                </div>
                <div className="space-y-2">
                  {TOP_DEBATERS.map((d, i) => {
                    const rc = RING[d.ringColor] ?? RING.blue
                    return (
                      <motion.div
                        key={d.id}
                        className="flex items-center gap-3 p-2 rounded-xl cursor-pointer"
                        style={{ background: '#0F1221', border: '1px solid #2E3650' }}
                        whileHover={{ borderColor: rc.border, background: '#141829' }}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                          style={{ background: rc.bg, border: `2px solid ${rc.border}`, boxShadow: `0 0 8px ${rc.shadow}` }}>
                          {d.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-chk text-[11px] font-bold text-t1 truncate">{d.username}</div>
                          <div className="font-mono text-[9px] text-t3">{d.wins}W · {d.losses}L</div>
                        </div>
                        <div className="font-mono text-[9px] font-bold" style={{ color: rc.border }}>
                          #{i + 1}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Stats card */}
              <div className="glass-card p-4">
                <div className="font-chk text-[10px] text-t3 tracking-[2px] uppercase mb-3">Live Stats</div>
                <div className="space-y-2">
                  {[
                    { label: 'Active Battles', value: '2,841', color: '#00CFFF' },
                    { label: 'Users Online',   value: '14.2K', color: '#00E676' },
                    { label: 'AI Wins Today',  value: '68%',   color: '#FF8A50' },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-t3">{s.label}</span>
                      <span className="font-chk text-[12px] font-bold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only: Top Debaters horizontal row */}
        <div className="lg:hidden">
          <div className="section-header mt-4">
            <span className="section-title">🏆 Top Debaters</span>
            <span className="section-link">View All →</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-3 px-3">
            {TOP_DEBATERS.map((d, i) => <DebaterCard key={d.id} debater={d} index={i} />)}
          </div>
        </div>

      </div>
      <XPToast toast={toast} />
    </div>
  )
}

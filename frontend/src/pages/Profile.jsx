import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import XPBar from '../components/XPBar'
import { CURRENT_USER, ACHIEVEMENTS, BATTLE_HISTORY } from '../utils/mockData'

function StatCell({ value, label, color }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="bg-s2 py-3 px-2 text-center">
      <motion.div
        className="font-mono text-[17px] md:text-[20px] font-black block mb-0.5"
        style={{ color }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </motion.div>
      <div className="font-chk text-[8px] text-t3 tracking-[0.5px] uppercase">{label}</div>
    </div>
  )
}

function AchCard({ ach, index }) {
  return (
    <motion.div
      className="rounded-xl p-2.5 text-center relative overflow-hidden cursor-pointer"
      style={ach.unlocked
        ? { background: '#141829', border: '1px solid rgba(255,180,0,0.28)' }
        : { background: '#141829', border: '1px solid #2E3650', filter: 'grayscale(1) opacity(0.28)' }
      }
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={ach.unlocked ? { scale: 1.04 } : {}}
      whileTap={ach.unlocked ? { scale: 0.97 } : {}}
    >
      {ach.unlocked && (
        <div className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: 'radial-gradient(circle at top center, rgba(255,180,0,0.07), transparent 60%)' }} />
      )}
      <div className="text-[22px] mb-1">{ach.icon}</div>
      <div className="font-chk text-[9px] font-bold text-t2 leading-tight">{ach.name}</div>
      {ach.unlocked && <div className="font-mono text-[7px] text-t3 mt-0.5">{ach.desc}</div>}
    </motion.div>
  )
}

function HistoryItem({ item, index }) {
  const isWin = item.result === 'WIN'
  return (
    <motion.div
      className="flex items-center gap-3 py-2.5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07, duration: 0.3 }}
    >
      <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center font-chk font-black text-[8px]"
        style={isWin
          ? { background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.28)', color: '#00E676' }
          : { background: 'rgba(255,48,64,0.08)',border: '1px solid rgba(255,48,64,0.22)', color: '#FF3040' }
        }>
        {item.result}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-exo font-bold text-[11px] md:text-[12px] text-t1 truncate">{item.topic}</div>
        <div className="font-mono text-[9px] text-t3 mt-0.5">{item.opponent} · {item.timeAgo}</div>
      </div>
      <div className="font-mono text-[11px] font-black" style={{ color: item.xp > 0 ? '#00E676' : '#FF3040' }}>
        {item.xp > 0 ? `+${item.xp}` : item.xp}
      </div>
    </motion.div>
  )
}

export default function Profile() {
  const user = CURRENT_USER

  return (
    <div className="ambient-bg min-h-screen">
      {/* Hero */}
      <motion.div
        className="px-4 pb-4 pt-3 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,rgba(124,58,237,0.14),transparent)', borderBottom: '1px solid #2E3650' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ backgroundImage: 'linear-gradient(rgba(124,58,237,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.05) 1px,transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Avatar */}
        <div className="relative inline-block mb-3">
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-10px', border: '1px solid rgba(124,58,237,0.25)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute w-[5px] h-[5px] rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ background: '#A855F7', boxShadow: '0 0 5px rgba(168,85,247,0.8)' }} />
          </motion.div>
          <motion.div
            className="w-[76px] h-[76px] md:w-24 md:h-24 rounded-full flex items-center justify-center text-[32px] md:text-[42px] relative z-10"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#0099CC)', border: '3px solid #A855F7', boxShadow: '0 0 24px rgba(168,85,247,0.4),0 0 48px rgba(168,85,247,0.12)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 18 }}
          >
            {user.avatar}
          </motion.div>
          <div className="absolute -bottom-1 -right-2 z-20 font-chk text-[8px] font-black px-2 py-0.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,#FFB400,#FF8C00)', color: '#1A0800', boxShadow: '0 2px 8px rgba(255,180,0,0.4)', letterSpacing: '1px' }}>
            GOLD
          </div>
        </div>

        <motion.h2
          className="font-chk text-[17px] md:text-[20px] font-bold text-t1 tracking-wide mb-0.5"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          {user.username}
        </motion.h2>
        <motion.p className="font-mono text-[10px] text-t3 mb-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {user.handle} · {user.title}
        </motion.p>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-4 gap-px rounded-xl overflow-hidden max-w-sm md:max-w-md mx-auto"
          style={{ background: '#2E3650' }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
          <StatCell value={user.wins}             label="Wins"     color="#00E676" />
          <StatCell value={user.losses}           label="Losses"   color="#FF3040" />
          <StatCell value={`${user.winRate}%`}    label="Win Rate" color="#FFB400" />
          <StatCell value={user.xp}               label="XP"       color="#A855F7" />
        </motion.div>
      </motion.div>

      <div className="page-container md:max-w-3xl lg:max-w-4xl mx-auto pt-4">
        {/*
          Desktop: two-column (XP + streaks | achievements + history)
          Mobile:  single column
        */}
        <div className="md:grid md:grid-cols-[1fr_1fr] md:gap-6 md:items-start">

          {/* LEFT col */}
          <div className="space-y-4">
            {/* XP bar */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
              <XPBar xp={user.xp} xpToNext={user.xpToNext} rank={user.rank} />
            </motion.div>

            {/* Win streak */}
            <motion.div
              className="rounded-xl p-3 flex items-center gap-3"
              style={{ background: 'linear-gradient(90deg,rgba(255,104,32,0.12),rgba(240,21,107,0.08),transparent)', border: '1px solid rgba(255,104,32,0.25)' }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <motion.span className="text-2xl" animate={{ rotate: [-8, 8, -8] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}>🔥</motion.span>
              <div className="flex-1">
                <div className="font-chk text-[12px] font-bold" style={{ color: '#FF8A50' }}>Current Win Streak</div>
                <div className="font-mono text-[10px] text-t3">
                  {10 - user.winStreak} more wins to unlock "Unstoppable"
                </div>
              </div>
              <div className="font-mono text-[22px] font-black"
                style={{ color: '#FF6820', textShadow: '0 0 10px rgba(255,104,32,0.5)' }}>
                {user.winStreak}
              </div>
            </motion.div>

            {/* Achievements */}
            <div>
              <div className="section-header">
                <span className="section-title">🏅 Achievements</span>
                <span className="font-chk text-[10px] text-nblue">
                  {ACHIEVEMENTS.filter(a => a.unlocked).length} / {ACHIEVEMENTS.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ACHIEVEMENTS.map((a, i) => <AchCard key={a.id} ach={a} index={i} />)}
              </div>
            </div>
          </div>

          {/* RIGHT col */}
          <div>
            {/* Battle history */}
            <div className="section-header mt-4 md:mt-0">
              <span className="section-title">⚔️ Recent Battles</span>
              <span className="section-link">View All →</span>
            </div>
            <div className="glass-card px-3 py-1">
              {BATTLE_HISTORY.map((item, i) => <HistoryItem key={item.id} item={item} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

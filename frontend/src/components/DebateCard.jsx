import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Badge from './Badge'
import RankBadge from './RankBadge'
import AIResponseCard from './AIResponseCard'

const TAG_VARIANT = { HOT: 'hot', LIVE: 'live', VIRAL: 'viral' }
const RANK_COLOR  = {
  Gold:   { border: '#FFB400', shadow: 'rgba(255,180,0,0.35)', bg: 'rgba(255,180,0,0.1)' },
  Silver: { border: '#9BAAC8', shadow: 'rgba(155,170,200,0.3)', bg: 'rgba(155,170,200,0.08)' },
  Bronze: { border: '#CD8B3A', shadow: 'rgba(205,139,58,0.3)', bg: 'rgba(205,139,58,0.08)' },
}

export default function DebateCard({ debate, index = 0, onJoin }) {
  const navigate = useNavigate()
  const rc       = RANK_COLOR[debate.user.rank] ?? RANK_COLOR.Silver

  const handleJoin = () => {
    if (onJoin) onJoin(debate)
    navigate('/arena')
  }

  return (
    <motion.div
      className="glass-card mb-3 cursor-pointer group"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.2, 1, 0.3, 1] }}
      whileHover={{
        borderColor: 'rgba(124,58,237,0.5)',
        boxShadow:   '0 0 28px rgba(124,58,237,0.14), 0 6px 20px rgba(0,0,0,0.4)',
        y: -2,
      }}
      style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}
    >
      {/* Tag */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <Badge variant={TAG_VARIANT[debate.tag] ?? 'blue'} pulse={debate.isLive}>
          {debate.isLive && <motion.span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />}
          {debate.tag === 'LIVE' ? '⚡ LIVE' : debate.tag === 'HOT' ? '🔥 HOT' : '🌪️ VIRAL'}
        </Badge>
      </div>

      {/* Card top */}
      <div className="p-3 pb-2">
        {/* User row */}
        <div className="flex items-center gap-2 mb-2.5">
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
            style={{
              background: rc.bg,
              border:     `2px solid ${rc.border}`,
              boxShadow:  `0 0 8px ${rc.shadow}`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            {debate.user.avatar}
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="font-chk text-[12px] font-bold text-t1 truncate">{debate.user.username}</div>
            <div className="flex items-center gap-1.5">
              <RankBadge rank={debate.user.rank} size="xs" />
              <span className="font-mono text-[9px] text-t3">{debate.user.wins}W</span>
            </div>
          </div>
          <span className="font-chk text-[9px] text-t3">{debate.timeAgo}</span>
        </div>

        {/* Opinion */}
        <p className="font-exo font-bold text-[14px] text-t1 leading-snug mb-2.5 pr-12">
          "{debate.opinion}"
        </p>

        {/* AI counter */}
        <AIResponseCard
          persona={debate.aiPersona}
          text={debate.aiCounter}
          compact
        />
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.03)' }}
      >
        <span className="font-mono text-[10px] text-t3">⚔️ {debate.battles.toLocaleString()}</span>
        <span className="font-mono text-[10px] text-t3">📊 {debate.score}pts</span>
        <span className="font-mono text-[10px] text-t3">👥 {debate.votes.toLocaleString()}</span>
        <span
          className="ml-auto font-chk text-[9px] font-bold rounded-full px-2 py-0.5"
          style={{
            background: 'rgba(0,230,118,0.08)',
            border:     '1px solid rgba(0,230,118,0.22)',
            color:      '#00E676',
          }}
        >
          +{debate.xpReward} XP
        </span>
      </div>

      {/* Join Battle CTA */}
      <motion.button
        className="w-full py-2.5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, rgba(124,58,237,0.85), rgba(0,153,204,0.78))',
          fontFamily: '"Chakra Petch", sans-serif',
          fontSize:   '11px',
          fontWeight: 700,
          letterSpacing: '1.8px',
          color:      'white',
        }}
        whileHover={{ filter: 'brightness(1.12)' }}
        whileTap={{ scale: 0.99 }}
        onClick={handleJoin}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)', translateX: '-100%' }}
          animate={{ translateX: ['−100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />
        {/* Top gloss */}
        <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08), transparent)' }} />
        <span className="relative">⚔️ JOIN BATTLE</span>
      </motion.button>
    </motion.div>
  )
}

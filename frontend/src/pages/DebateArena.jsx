import { motion, AnimatePresence } from 'framer-motion'
import ScoreBar from '../components/ScoreBar'
import { useTimer, useXPToast } from '../hooks/useDebate'
import { CURRENT_DEBATE } from '../utils/mockData'

function Timer({ formatted, seconds }) {
  const isUrgent = seconds < 30
  return (
    <motion.div
      className="flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[15px] font-black tracking-[2px]"
      style={{
        background: `rgba(255,48,64,${isUrgent ? 0.18 : 0.1})`,
        border:     `1px solid rgba(255,48,64,${isUrgent ? 0.5 : 0.3})`,
        color:      '#FF3040',
        boxShadow:  isUrgent ? '0 0 14px rgba(255,48,64,0.3)' : 'none',
      }}
      animate={isUrgent ? { scale: [1, 1.04, 1] } : {}}
      transition={{ duration: 0.5, repeat: isUrgent ? Infinity : 0 }}
    >
      <motion.span className="w-2 h-2 rounded-full bg-red-400"
        animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} />
      {formatted}
    </motion.div>
  )
}

function PlayerAvatar({ isAI, score, isWinning }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <motion.div
          className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl"
          style={isAI
            ? { background: 'rgba(0,207,255,0.07)', border: '2px solid #00CFFF' }
            : { background: 'rgba(124,58,237,0.12)', border: '2px solid #A855F7' }
          }
          animate={{
            boxShadow: isAI
              ? ['0 0 20px rgba(0,207,255,0.4)', '0 0 36px rgba(0,207,255,0.72)', '0 0 20px rgba(0,207,255,0.4)']
              : ['0 0 14px rgba(168,85,247,0.35)', '0 0 24px rgba(168,85,247,0.55)', '0 0 14px rgba(168,85,247,0.35)'],
          }}
          transition={{ duration: isAI ? 2.5 : 3, repeat: Infinity }}
        >
          {isAI ? '🤖' : '😤'}
        </motion.div>
        {isAI && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center font-chk font-black text-[8px]"
            style={{ background: '#00CFFF', color: '#06080F', boxShadow: '0 0 6px rgba(0,207,255,0.5)' }}>
            AI
          </div>
        )}
        {isWinning && (
          <motion.div className="absolute -top-3 -right-1 text-base z-10"
            animate={{ y: [0, -3, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ filter: 'drop-shadow(0 0 5px rgba(255,180,0,0.85))' }}>
            👑
          </motion.div>
        )}
      </div>
      <div className="font-chk text-[11px] font-bold" style={{ color: isAI ? '#00CFFF' : '#FFFFFF' }}>
        {isAI ? 'AI Opponent' : 'You'}
      </div>
      <motion.div
        className="font-mono text-[13px] font-black px-3 py-0.5 rounded-full"
        style={isAI
          ? { background: 'rgba(0,207,255,0.1)',   border: '1px solid rgba(0,207,255,0.28)',   color: '#00CFFF', boxShadow: isWinning ? '0 0 10px rgba(0,207,255,0.35)' : 'none' }
          : { background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.28)', color: '#A855F7', boxShadow: isWinning ? '0 0 10px rgba(168,85,247,0.4)' : 'none' }
        }
        animate={isWinning ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1.5, repeat: isWinning ? Infinity : 0 }}
      >
        {score} pts
      </motion.div>
    </div>
  )
}

function ArgumentBlock({ isAI, text, label, isWinning, index }) {
  return (
    <motion.div
      className="rounded-xl p-3 relative overflow-hidden"
      style={isAI
        ? { background: 'rgba(0,207,255,0.05)',   border: '1px solid rgba(0,207,255,0.18)',   borderLeft: '3px solid #00CFFF' }
        : { background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.22)', borderLeft: '3px solid #A855F7' }
      }
      initial={{ opacity: 0, x: isAI ? 20 : -20 }}
      animate={{ opacity: 1, x: 0, boxShadow: isAI
        ? ['0 0 0px rgba(0,207,255,0)', '0 0 14px rgba(0,207,255,0.07)', '0 0 0px rgba(0,207,255,0)']
        : '0 0 0px rgba(0,0,0,0)'
      }}
      transition={{
        opacity:   { delay: index * 0.12, duration: 0.4, ease: [0.2,1,0.3,1] },
        x:         { delay: index * 0.12, duration: 0.4, ease: [0.2,1,0.3,1] },
        boxShadow: { delay: 0.5, duration: 2.8, repeat: Infinity },
      }}
    >
      {isAI && (
        <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
          <motion.div className="h-full w-full"
            style={{ background: 'linear-gradient(90deg, transparent, #00CFFF, transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }} />
        </div>
      )}
      {isWinning && (
        <motion.div className="absolute -top-2 right-2 text-base"
          animate={{ y: [0, -3, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(255,180,0,0.8))' }}>
          👑
        </motion.div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <span className="font-chk text-[8px] font-bold tracking-[1px]"
          style={{ color: isAI ? '#00CFFF' : '#A855F7' }}>
          {label}
        </span>
        {isAI && (
          <span className="font-chk text-[7px] rounded-full px-1.5 py-px"
            style={{ background: 'rgba(0,207,255,0.1)', border: '1px solid rgba(0,207,255,0.22)', color: '#00CFFF' }}>
            {CURRENT_DEBATE.aiPersona}
          </span>
        )}
      </div>
      <p className="font-exo text-[12px] md:text-[13px] text-t2 leading-relaxed">{text}</p>
    </motion.div>
  )
}

function ActionBtn({ icon, label, variant, onClick }) {
  const s = {
    reply:   { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.28)', color: '#A855F7', shadow: 'none' },
    counter: { bg: 'linear-gradient(135deg,#7C3AED,#0099CC)', border: 'transparent', color: 'white', shadow: '0 2px 12px rgba(124,58,237,0.35)' },
    vote:    { bg: 'rgba(0,230,118,0.07)',  border: 'rgba(0,230,118,0.25)', color: '#00E676', shadow: 'none' },
  }[variant]
  return (
    <motion.button
      className="flex-1 py-2.5 rounded-xl font-chk text-[10px] md:text-[11px] font-bold tracking-wide text-center border"
      style={{ background: s.bg, borderColor: s.border, color: s.color, boxShadow: s.shadow }}
      whileTap={{ scale: 0.93 }}
      whileHover={{ filter: 'brightness(1.12)' }}
      onClick={onClick}
    >
      {icon} {label}
    </motion.button>
  )
}

function XPToast({ toast }) {
  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          key={toast.key}
          className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-2 rounded-full font-chk text-[12px] font-bold whitespace-nowrap"
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

export default function DebateArena() {
  const debate         = CURRENT_DEBATE
  const { formatted, seconds } = useTimer(debate.timeSeconds)
  const { toast, showToast }   = useXPToast()
  const userWinning            = debate.userScore > debate.aiScore

  const handleAction = (label, xp) => showToast(`${label} +${xp} XP`)

  return (
    <div className="ambient-bg min-h-screen">
      {/* Arena header */}
      <motion.div
        className="px-4 pt-3 pb-3 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,rgba(124,58,237,0.14),rgba(0,207,255,0.06) 60%,transparent)', borderBottom: '1px solid #2E3650' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(124,58,237,0.5),#00CFFF,rgba(124,58,237,0.5),transparent)' }} />
        <p className="font-chk text-[9px] text-t3 text-center tracking-[2.5px] uppercase mb-1">⚔️ DEBATE ARENA</p>
        <p className="font-exo font-bold italic text-[14px] md:text-[16px] text-t1 text-center leading-snug mb-3 max-w-2xl mx-auto">
          {debate.topic}
        </p>
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <Timer formatted={formatted} seconds={seconds} />
          <div className="font-chk text-[9px] font-bold px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.28)', color: '#A855F7' }}>
            ROUND {debate.round} / {debate.totalRounds}
          </div>
          <div className="font-chk text-[9px] font-bold flex items-center gap-1" style={{ color: '#FFB400' }}>
            ⚡ QUICK MATCH
          </div>
        </div>
      </motion.div>

      <div className="page-container md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto pt-3">

        {/* Player vs AI row */}
        <motion.div
          className="flex items-center px-4 py-3 gap-2 rounded-xl mb-3"
          style={{ background: '#0F1221', border: '1px solid #2E3650' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PlayerAvatar isAI={false} score={debate.userScore} isWinning={userWinning} />
          <div className="flex-1 text-center font-chk text-[20px] md:text-[24px] font-bold text-t4">VS</div>
          <PlayerAvatar isAI={true} score={debate.aiScore} isWinning={debate.aiLeading} />
        </motion.div>

        {/* AI persona bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl mb-3"
          style={{ background: 'rgba(0,207,255,0.04)', border: '1px solid rgba(0,207,255,0.1)' }}>
          <span className="font-chk text-[8px] font-bold rounded-full px-2 py-0.5 flex items-center gap-1"
            style={{ background: 'rgba(0,207,255,0.12)', border: '1px solid rgba(0,207,255,0.3)', color: '#00CFFF' }}>
            🤖 AI OPPONENT
          </span>
          <span className="font-chk text-[7px] rounded-full px-2 py-px"
            style={{ background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.18)', color: '#00CFFF' }}>
            {debate.aiPersona}
          </span>
          <span className="ml-auto font-mono text-[8px] text-t3">⚖️ FAIR AI JUDGEMENT</span>
        </div>

        {/*
          Desktop: arguments side by side
          Mobile:  arguments stacked
        */}
        <div className="md:grid md:grid-cols-2 md:gap-3 mb-3 space-y-2.5 md:space-y-0">
          <ArgumentBlock isAI={false} text={debate.userArgument}
            label="👤 YOUR ARGUMENT — ROUND 2" isWinning={userWinning} index={0} />
          <ArgumentBlock isAI={true} text={debate.aiArgument}
            label="🤖 AI ARGUMENT" isWinning={debate.aiLeading} index={1} />
        </div>

        {/* Winner bar */}
        <motion.div
          className="rounded-xl p-2.5 flex items-center gap-2.5 mb-3"
          style={{ background: 'linear-gradient(90deg,rgba(255,180,0,0.1),rgba(255,180,0,0.04))', border: '1px solid rgba(255,180,0,0.25)' }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span className="text-lg" style={{ filter: 'drop-shadow(0 0 4px rgba(255,180,0,0.7))' }}
            animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 0.8, repeat: Infinity }}>👑</motion.span>
          <div>
            <div className="font-chk text-[11px] font-bold" style={{ color: '#FFB400' }}>AI winning this round</div>
            <div className="font-mono text-[9px] text-t3">Argument "Destroyed" — most popular counter</div>
          </div>
          <div className="ml-auto font-mono text-[10px] text-t3">Round 2/3</div>
        </motion.div>

        {/* Score bars */}
        <motion.div
          className="glass-card p-3 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-chk text-[8px] text-t3 tracking-[2px] uppercase">⚖️ Live Score</span>
            <div className="flex gap-3">
              {[['You','#A855F7'],['AI','#00CFFF']].map(([lbl,col]) => (
                <span key={lbl} className="flex items-center gap-1 font-mono text-[9px] text-t3">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: col }} />
                  {lbl}
                </span>
              ))}
            </div>
          </div>
          {/* Desktop: 3-col grid | Mobile: stack */}
          <div className="md:grid md:grid-cols-3 md:gap-4 space-y-0">
            {debate.scoreBars.map((bar, i) => (
              <ScoreBar key={bar.label} label={bar.label} userScore={bar.userScore} aiScore={bar.aiScore} index={i} />
            ))}
          </div>
        </motion.div>

        {/* XP incentive */}
        <motion.div
          className="rounded-xl p-2.5 flex items-center gap-3 mb-4"
          style={{ background: 'rgba(0,230,118,0.06)', border: '1px solid rgba(0,230,118,0.18)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          <motion.span className="text-xl" animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}>⚡</motion.span>
          <div className="flex-1">
            <div className="font-chk text-[10px] font-bold" style={{ color: '#00E676' }}>WIN THIS ROUND</div>
            <div className="font-mono text-[9px] text-t3">Score &gt;90 on Logic to turn the tide</div>
          </div>
          <div className="font-mono text-[18px] font-black"
            style={{ color: '#00E676', textShadow: '0 0 10px rgba(0,230,118,0.4)' }}>
            +{debate.xpOnWin}
          </div>
        </motion.div>

        {/* Action buttons */}
        <div
          className="flex gap-2 py-2.5 md:py-3 px-0 md:px-0"
          style={{ borderTop: '1px solid #2E3650', paddingTop: '12px' }}
        >
          <ActionBtn icon="↩" label="REPLY"   variant="reply"   onClick={() => handleAction('Replied!',  10)} />
          <ActionBtn icon="⚔️" label="COUNTER" variant="counter" onClick={() => handleAction('Countered!', 25)} />
          <ActionBtn icon="👍" label="VOTE"    variant="vote"    onClick={() => handleAction('Voted!',     5)} />
        </div>
      </div>

      <XPToast toast={toast} />
    </div>
  )
}

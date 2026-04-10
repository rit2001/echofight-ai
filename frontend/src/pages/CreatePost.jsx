import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AIResponseCard from '../components/AIResponseCard'
import { useAIPreview } from '../hooks/useDebate'
import { getAICounter } from '../utils/api'
import { CATEGORIES } from '../utils/mockData'

const BATTLE_MODES = [
  { id: 'ai',    icon: '🤖', label: 'vs AI',      sub: 'Instant match' },
  { id: 'human', icon: '👥', label: 'vs Human',   sub: 'Matchmaking'   },
  { id: 'open',  icon: '🌍', label: 'Open Arena', sub: 'Public debate' },
]

// ── Loading dots animation ────────────────────────────────────────
function ThinkingDots() {
  return (
    <div
      className="rounded-xl p-3 flex items-center gap-3"
      style={{ background: 'rgba(0,207,255,0.04)', border: '1px solid rgba(0,207,255,0.15)' }}
    >
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: '#00CFFF' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-t3">
        🤖 Thinking...
      </span>
    </div>
  )
}

// ── Error state ───────────────────────────────────────────────────
function AIError() {
  return (
    <div
      className="rounded-xl p-3 flex items-center gap-3"
      style={{ background: 'rgba(255,48,64,0.05)', border: '1px solid rgba(255,48,64,0.2)' }}
    >
      <span className="text-lg">⚠️</span>
      <span className="font-mono text-[11px]" style={{ color: '#FF8A80' }}>
        AI failed to respond. Check your connection and try again.
      </span>
    </div>
  )
}

// ── Static placeholder (no input yet) ────────────────────────────
function AIPlaceholder() {
  return (
    <motion.div
      className="mb-3 rounded-xl p-3 relative overflow-hidden"
      style={{ background: 'rgba(0,207,255,0.04)', border: '1px solid rgba(0,207,255,0.15)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <motion.div
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, transparent, #00CFFF, transparent)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-chk text-[8px] font-bold rounded-full px-2 py-0.5"
          style={{
            background: 'rgba(0,207,255,0.12)',
            border:     '1px solid rgba(0,207,255,0.3)',
            color:      '#00CFFF',
          }}
        >
          🤖 AI CHALLENGE INCOMING
        </span>
      </div>
      <p className="font-exo text-[11px] text-t3 leading-relaxed">
        Type your take above — the AI will prepare a real-time counter-attack. It won't pull punches.
      </p>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export default function CreatePost() {
  const navigate = useNavigate()

  const [text, setText]           = useState('')
  const [category, setCategory]   = useState('Tech')
  const [mode, setMode]           = useState('ai')
  const [starting, setStarting]   = useState(false)

  // Real API hook — debounces 800ms, calls /api/counter
  const { response, loading, error, trigger, reset } = useAIPreview()

  // Pass full text to trigger on every keystroke
  const handleChange = useCallback((e) => {
    const val = e.target.value
    setText(val)
    trigger(val)
  }, [trigger])

  // On "Start Battle": if no preview yet, fetch once then navigate
  const handleStart = async () => {
    if (!text.trim() || starting) return
    setStarting(true)

    // If the debounced preview hasn't resolved yet, fire a direct call
    if (!response && !loading) {
      await getAICounter(text.trim())
    }

    // Brief pause so the button animation plays out, then go to arena
    setTimeout(() => navigate('/arena'), 500)
  }

  const charCount = text.length
  const maxChars  = 280
  const canSubmit = charCount >= 10 && !starting

  const xpMap    = { ai: 200, human: 300, open: 150 }
  const xpReward = xpMap[mode]

  const showPreviewSection = loading || error || response

  return (
    <div className="ambient-bg min-h-screen">
      {/* Header */}
      <motion.div
        className="text-center py-4 px-4"
        style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.1), transparent)' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="font-chk text-[18px] font-bold tracking-[2px] text-logo mb-1">
          ⚔️ START A BATTLE
        </h2>
        <p className="font-mono text-[10px] text-t3">
          // drop your hot take · face the AI · dominate
        </p>
      </motion.div>

      <div className="page-container pt-0">

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <p className="font-chk text-[8px] text-t3 tracking-[2px] uppercase mb-2">
            Select Category
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                className="px-3 py-1.5 rounded-full font-chk text-[10px] font-semibold border transition-all"
                style={
                  category === cat
                    ? { background: 'rgba(124,58,237,0.18)', borderColor: 'rgba(124,58,237,0.45)', color: '#A855F7' }
                    : { background: '#141829', borderColor: '#2E3650', color: '#5A6685' }
                }
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Textarea */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mb-3"
        >
          <p className="font-chk text-[8px] text-t3 tracking-[2px] uppercase mb-2">
            Your Hot Take
          </p>
          <div className="relative">
            <textarea
              className="w-full rounded-xl p-3 font-exo font-semibold text-[14px] text-t1 resize-none outline-none min-h-[90px] transition-all"
              style={{
                background: '#141829',
                border:     `1px solid ${text.length > 0 ? 'rgba(124,58,237,0.45)' : 'rgba(124,58,237,0.25)'}`,
                boxShadow:  text.length > 0 ? '0 0 14px rgba(124,58,237,0.12)' : 'none',
              }}
              placeholder="Drop your hot take..."
              value={text}
              onChange={handleChange}
              maxLength={maxChars}
            />
            <div
              className="absolute bottom-2 right-3 font-mono text-[9px]"
              style={{ color: charCount > 240 ? '#FF8A50' : '#5A6685' }}
            >
              {charCount}/{maxChars}
            </div>
          </div>
        </motion.div>

        {/* AI Preview — live / loading / error / placeholder */}
        <div className="mb-3">
          <AnimatePresence mode="wait">
            {showPreviewSection ? (
              <motion.div
                key="live-preview"
                initial={{ opacity: 0, y: 12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3, ease: [0.2, 1, 0.3, 1] }}
              >
                {/* Section label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-chk text-[8px] text-t3 tracking-[2px] uppercase">
                    AI Challenge Incoming
                  </span>
                  {loading && (
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: '#00CFFF' }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  )}
                </div>

                {loading && <ThinkingDots />}
                {!loading && error && <AIError />}
                {!loading && !error && response && (
                  <AIResponseCard persona="Challenger AI" text={response} />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AIPlaceholder />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Battle Mode */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mb-3"
        >
          <p className="font-chk text-[8px] text-t3 tracking-[2px] uppercase mb-2">
            Battle Mode
          </p>
          <div className="grid grid-cols-3 gap-2">
            {BATTLE_MODES.map((m) => (
              <motion.button
                key={m.id}
                className="rounded-xl p-2.5 text-center border transition-all"
                style={
                  mode === m.id
                    ? { background: 'rgba(124,58,237,0.14)', borderColor: 'rgba(124,58,237,0.45)' }
                    : { background: '#141829', borderColor: '#2E3650' }
                }
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(m.id)}
              >
                <div className="text-xl mb-1">{m.icon}</div>
                <div className="font-chk text-[10px] font-bold text-t2">{m.label}</div>
                <div className="font-mono text-[8px] text-t3 mt-0.5">{m.sub}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Reward tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
        >
          <span
            className="font-chk text-[9px] font-bold rounded-full px-3 py-1.5 flex items-center gap-1"
            style={{ background: 'rgba(0,230,118,0.07)', border: '1px solid rgba(0,230,118,0.2)', color: '#00E676' }}
          >
            ⚡ Win = +{xpReward} XP
          </span>
          <span
            className="font-chk text-[9px] font-bold rounded-full px-3 py-1.5 flex items-center gap-1"
            style={{ background: 'rgba(255,180,0,0.07)', border: '1px solid rgba(255,180,0,0.2)', color: '#FFB400' }}
          >
            🎯 Skill Score Active
          </span>
          <span
            className="font-chk text-[9px] font-bold rounded-full px-3 py-1.5 flex items-center gap-1"
            style={{ background: 'rgba(0,207,255,0.07)', border: '1px solid rgba(0,207,255,0.2)', color: '#00CFFF' }}
          >
            ⚖️ Fair AI Judge
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
        >
          <motion.button
            className="w-full py-3.5 rounded-xl font-chk text-[13px] font-bold tracking-[2.5px] relative overflow-hidden"
            style={{
              background: canSubmit
                ? 'linear-gradient(135deg, #7C3AED, #0099CC)'
                : '#1A2038',
              boxShadow: canSubmit
                ? '0 4px 20px rgba(124,58,237,0.35)'
                : 'none',
              color: canSubmit ? 'white' : '#5A6685',
            }}
            whileHover={canSubmit ? { boxShadow: '0 4px 28px rgba(124,58,237,0.55)' } : {}}
            whileTap={canSubmit ? { scale: 0.99 } : {}}
            onClick={handleStart}
            disabled={!canSubmit}
          >
            {canSubmit && (
              <>
                <div
                  className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.1), transparent)' }}
                />
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1 }}
                />
              </>
            )}
            <span className="relative flex items-center justify-center gap-2">
              {starting && (
                <motion.span
                  className="w-3 h-3 rounded-full border-2 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                />
              )}
              {starting ? 'ENTERING ARENA...' : 'START BATTLE ⚔️'}
            </span>
          </motion.button>

          {!canSubmit && !starting && (
            <p className="font-mono text-[10px] text-t3 text-center mt-2">
              Type at least 10 characters to start
            </p>
          )}
        </motion.div>

      </div>
    </div>
  )
}

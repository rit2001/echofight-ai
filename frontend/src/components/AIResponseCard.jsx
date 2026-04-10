import { motion } from 'framer-motion'

export default function AIResponseCard({ persona, text, isWinning = false, compact = false }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden"
      style={{
        background:   'rgba(0,207,255,0.05)',
        border:       `1px solid rgba(0,207,255,0.2)`,
        borderLeft:   '3px solid #00CFFF',
      }}
      animate={{
        boxShadow: isWinning
          ? [
              '0 0 0px rgba(0,207,255,0)',
              '0 0 16px rgba(0,207,255,0.18)',
              '0 0 0px rgba(0,207,255,0)',
            ]
          : '0 0 0px rgba(0,207,255,0)',
      }}
      transition={{ duration: 2.8, repeat: Infinity }}
    >
      {/* Scan line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, transparent, #00CFFF, transparent)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Winner crown */}
      {isWinning && (
        <motion.div
          className="absolute -top-2 right-3 text-lg z-10"
          animate={{ y: [0, -3, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(255,180,0,0.8))' }}
        >
          👑
        </motion.div>
      )}

      <div className={compact ? 'p-2.5' : 'p-3'}>
        {/* Header row */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="font-chk text-[8px] font-bold tracking-[1px] flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              background: 'rgba(0,207,255,0.14)',
              border:     '1px solid rgba(0,207,255,0.32)',
              color:      '#00CFFF',
            }}
          >
            🤖 AI OPPONENT
          </span>
          {persona && (
            <span
              className="font-chk text-[7px] rounded-full px-1.5 py-px"
              style={{
                background: 'rgba(0,207,255,0.08)',
                border:     '1px solid rgba(0,207,255,0.18)',
                color:      '#00CFFF',
              }}
            >
              {persona}
            </span>
          )}
        </div>

        {/* AI text */}
        <p
          className={`font-exo leading-relaxed ${compact ? 'text-[11px]' : 'text-[12px]'}`}
          style={{ color: '#6EC8E8' }}
        >
          {text}
        </p>
      </div>
    </motion.div>
  )
}

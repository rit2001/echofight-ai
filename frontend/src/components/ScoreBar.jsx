import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function SingleBar({ value, color, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="h-[5px] rounded-full overflow-hidden bg-t4/25">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : {}}
        transition={{ duration: 0.9, delay, ease: [0.2, 1, 0.3, 1] }}
      />
    </div>
  )
}

export default function ScoreBar({ label, userScore, aiScore, index = 0 }) {
  const baseDelay = index * 0.1

  return (
    <div className="mb-3 last:mb-0">
      {/* Label row */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-chk text-[10px] font-semibold text-t2">{label}</span>
        <div className="flex gap-2 items-center">
          <span className="font-mono text-[9px] font-bold text-npur2">{userScore}</span>
          <span className="font-mono text-[9px] text-t4">vs</span>
          <span className="font-mono text-[9px] font-bold text-nblue">{aiScore}</span>
        </div>
      </div>
      {/* User bar */}
      <SingleBar
        value={userScore}
        color="linear-gradient(90deg, #7C3AED, #A855F7)"
        delay={baseDelay + 0.2}
      />
      {/* AI bar */}
      <div className="mt-1.5">
        <SingleBar
          value={aiScore}
          color="linear-gradient(90deg, #0099CC, #00CFFF)"
          delay={baseDelay + 0.35}
        />
      </div>
    </div>
  )
}

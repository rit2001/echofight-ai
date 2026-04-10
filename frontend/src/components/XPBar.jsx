import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import RankBadge from './RankBadge'

export default function XPBar({ xp, xpToNext, rank, compact = false }) {
  const pct  = Math.min((xp / xpToNext) * 100, 100)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 300)
    return () => clearTimeout(t)
  }, [pct])

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-s1 px-3 py-1.5 border-b border-t4">
        <RankBadge rank={rank} size="xs" />
        <div className="flex-1 relative">
          <div className="h-[5px] rounded-full overflow-hidden bg-t4/30">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #7C3AED, #00CFFF)' }}
              initial={{ width: 0 }}
              animate={{ width: `${width}%` }}
              transition={{ duration: 1.2, ease: [0.2, 1, 0.3, 1] }}
            />
          </div>
        </div>
        <span className="font-mono text-[9px] text-npur2 font-bold whitespace-nowrap">
          ⚡ {xp.toLocaleString()}
        </span>
      </div>
    )
  }

  return (
    <div className="bg-s2 border border-t4 rounded-xl p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="font-chk text-[9px] text-t3 tracking-[2px] uppercase">XP Progress</span>
        <span className="font-chk text-[9px] text-npur2 font-bold">
          {xpToNext.toLocaleString()} XP → LEGEND
        </span>
      </div>

      <div className="h-[9px] rounded-full overflow-hidden bg-t4/25 mb-2 relative">
        <motion.div
          className="h-full rounded-full relative"
          style={{ background: 'linear-gradient(90deg, #7C3AED, #00CFFF)' }}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.4, ease: [0.2, 1, 0.3, 1] }}
        >
          {/* Shimmer */}
          <div
            className="absolute right-0 top-0 bottom-0 w-5 rounded-r-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45))' }}
          />
        </motion.div>
      </div>

      <div className="font-mono text-[10px] text-t2">
        <span className="text-npur2 font-bold">{xp.toLocaleString()}</span>
        {' / '}
        {xpToNext.toLocaleString()} XP
        <span className="text-t3 ml-2">
          · {(xpToNext - xp).toLocaleString()} to next rank
        </span>
      </div>
    </div>
  )
}

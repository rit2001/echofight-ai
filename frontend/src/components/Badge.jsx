import { motion } from 'framer-motion'

const VARIANTS = {
  hot:    { bg: 'rgba(255,104,32,0.12)', border: 'rgba(255,104,32,0.35)', color: '#FF8A50', label: '🔥 HOT'   },
  live:   { bg: 'rgba(0,207,255,0.09)',  border: 'rgba(0,207,255,0.32)',  color: '#00CFFF', label: '⚡ LIVE'  },
  viral:  { bg: 'rgba(240,21,107,0.1)',  border: 'rgba(240,21,107,0.3)',  color: '#FF5EA0', label: '🌪️ VIRAL' },
  win:    { bg: 'rgba(0,230,118,0.1)',   border: 'rgba(0,230,118,0.28)',  color: '#00E676', label: 'WIN'      },
  loss:   { bg: 'rgba(255,48,64,0.1)',   border: 'rgba(255,48,64,0.25)',  color: '#FF3040', label: 'LOSS'     },
  xp:     { bg: 'rgba(0,230,118,0.08)', border: 'rgba(0,230,118,0.22)',  color: '#00E676', label: null       },
  blue:   { bg: 'rgba(0,207,255,0.1)',   border: 'rgba(0,207,255,0.28)',  color: '#00CFFF', label: null       },
  purple: { bg: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)',  color: '#A855F7', label: null       },
  gold:   { bg: 'rgba(255,180,0,0.1)',   border: 'rgba(255,180,0,0.28)',  color: '#FFB400', label: null       },
  pink:   { bg: 'rgba(240,21,107,0.1)', border: 'rgba(240,21,107,0.28)', color: '#FF5EA0', label: null       },
}

export default function Badge({ variant = 'blue', children, pulse = false, size = 'sm', className = '' }) {
  const v  = VARIANTS[variant] ?? VARIANTS.blue
  const sz = size === 'xs' ? 'text-[7px] px-1.5 py-px' : 'text-[9px] px-2 py-0.5'

  return (
    <motion.span
      className={`inline-flex items-center gap-1 rounded-full font-chk font-bold tracking-wide ${sz} ${className}`}
      style={{
        background:   v.bg,
        border:       `1px solid ${v.border}`,
        color:        v.color,
        flexShrink:   0,
      }}
      animate={pulse ? {
        boxShadow: [
          `0 0 0px ${v.border}`,
          `0 0 8px ${v.border}`,
          `0 0 0px ${v.border}`,
        ]
      } : {}}
      transition={pulse ? { duration: 1.6, repeat: Infinity } : {}}
    >
      {/* Live dot for live badge */}
      {variant === 'live' && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-red-400"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
      {children ?? v.label}
    </motion.span>
  )
}

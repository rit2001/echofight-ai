import { motion } from 'framer-motion'

const VARIANTS = {
  battle: {
    base:    'text-white font-chk tracking-[2px] font-bold',
    style:   { background: 'linear-gradient(135deg, #7C3AED, #0099CC)' },
    shadow:  '0 4px 20px rgba(124,58,237,0.35), 0 2px 8px rgba(0,0,0,0.3)',
    hover:   { scale: 1.02, boxShadow: '0 4px 28px rgba(124,58,237,0.55)' },
  },
  outline: {
    base:    'font-chk tracking-[1px] font-bold',
    style:   { background: 'transparent', border: '1px solid rgba(124,58,237,0.35)', color: '#A855F7' },
    shadow:  'none',
    hover:   { scale: 1.02, borderColor: 'rgba(124,58,237,0.6)' },
  },
  ghost: {
    base:    'font-chk tracking-[1px] font-semibold',
    style:   { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', color: '#A855F7' },
    shadow:  'none',
    hover:   { scale: 1.02, background: 'rgba(124,58,237,0.18)' },
  },
  green: {
    base:    'font-chk tracking-[1px] font-bold',
    style:   { background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.28)', color: '#00E676' },
    shadow:  'none',
    hover:   { scale: 1.02, background: 'rgba(0,230,118,0.18)' },
  },
  danger: {
    base:    'font-chk tracking-[1px] font-bold',
    style:   { background: 'rgba(255,48,64,0.1)', border: '1px solid rgba(255,48,64,0.28)', color: '#FF3040' },
    shadow:  'none',
    hover:   { scale: 1.02, background: 'rgba(255,48,64,0.18)' },
  },
}

const SIZE = {
  sm:  'text-[9px] px-3 py-2 rounded-lg',
  md:  'text-[11px] px-4 py-2.5 rounded-xl',
  lg:  'text-[12px] px-5 py-3 rounded-xl',
  xl:  'text-[13px] px-6 py-3.5 rounded-xl w-full',
}

export default function Button({
  children,
  variant = 'battle',
  size    = 'md',
  onClick,
  disabled = false,
  className = '',
  icon,
}) {
  const v  = VARIANTS[variant] ?? VARIANTS.battle
  const sz = SIZE[size] ?? SIZE.md

  return (
    <motion.button
      className={`${v.base} ${sz} relative overflow-hidden cursor-pointer select-none ${className}`}
      style={{
        ...v.style,
        boxShadow: v.shadow,
        opacity: disabled ? 0.45 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      whileHover={v.hover}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Shimmer overlay for battle variant */}
      {variant === 'battle' && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            transform: 'translateX(-100%)',
          }}
          animate={{ transform: ['translateX(-100%)', 'translateX(200%)'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
        />
      )}
      {/* Gradient top-gloss */}
      {variant === 'battle' && (
        <div
          className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-xl"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.1), transparent)' }}
        />
      )}
      <span className="relative flex items-center justify-center gap-2">
        {icon && <span>{icon}</span>}
        {children}
      </span>
    </motion.button>
  )
}

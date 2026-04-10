import { motion } from 'framer-motion'

const RANK_CONFIG = {
  Bronze: {
    gradient: 'linear-gradient(135deg, #CD8B3A, #A05A1A)',
    glow:     'rgba(205,127,50,0.45)',
    text:     '#2A1000',
  },
  Silver: {
    gradient: 'linear-gradient(135deg, #C0C8E0, #7B8AB0)',
    glow:     'rgba(192,192,210,0.35)',
    text:     '#0A1020',
  },
  Gold: {
    gradient: 'linear-gradient(135deg, #FFB400, #FF8C00)',
    glow:     'rgba(255,180,0,0.5)',
    text:     '#1A0800',
  },
  Legend: {
    gradient: 'linear-gradient(135deg, #A855F7, #00CFFF)',
    glow:     'rgba(168,85,247,0.55)',
    text:     '#FFFFFF',
  },
}

export default function RankBadge({ rank = 'Gold', size = 'md', animate = false }) {
  const cfg = RANK_CONFIG[rank] ?? RANK_CONFIG.Gold

  const sizeMap = {
    xs:  { fontSize: '8px',  padding: '2px 7px',  borderRadius: '20px' },
    sm:  { fontSize: '9px',  padding: '3px 9px',  borderRadius: '20px' },
    md:  { fontSize: '10px', padding: '4px 11px', borderRadius: '20px' },
    lg:  { fontSize: '12px', padding: '5px 14px', borderRadius: '20px' },
    xl:  { fontSize: '14px', padding: '6px 16px', borderRadius: '20px' },
  }

  const sz = sizeMap[size] ?? sizeMap.md

  const icons = { Bronze: '🥉', Silver: '🥈', Gold: '⭐', Legend: '💎' }

  return (
    <motion.span
      whileHover={animate ? { scale: 1.08 } : {}}
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             '4px',
        fontFamily:      '"Chakra Petch", sans-serif',
        fontWeight:      900,
        letterSpacing:   '1px',
        background:      cfg.gradient,
        color:           cfg.text,
        boxShadow:       `0 2px 10px ${cfg.glow}`,
        userSelect:      'none',
        flexShrink:      0,
        ...sz,
      }}
    >
      <span style={{ fontSize: sz.fontSize }}>{icons[rank]}</span>
      {rank.toUpperCase()}
    </motion.span>
  )
}

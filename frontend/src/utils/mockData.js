// ── Mock Data for EchoFight ──────────────────────────────────────

export const CURRENT_USER = {
  id: 'u1',
  username: 'RageKing',
  handle: '@rageking',
  avatar: '😤',
  rank: 'Gold',
  xp: 2840,
  xpToNext: 5000,
  wins: 142,
  losses: 18,
  winStreak: 5,
  winRate: 88,
  totalDebates: 160,
  title: 'EchoFight Gold',
}

export const TOP_DEBATERS = [
  { id: 'u1', username: 'RageKing',   avatar: '😤', rank: 'Gold',   wins: 142, losses: 18,  ringColor: 'gold'   },
  { id: 'u2', username: 'LogicBomb',  avatar: '🧠', rank: 'Gold',   wins: 98,  losses: 22,  ringColor: 'blue'   },
  { id: 'u3', username: 'FactSlayer', avatar: '🎯', rank: 'Silver', wins: 87,  losses: 31,  ringColor: 'purple' },
  { id: 'u4', username: 'ChaosTheo',  avatar: '🌪️', rank: 'Gold',   wins: 76,  losses: 14,  ringColor: 'pink'   },
  { id: 'u5', username: 'ZeroGrav',   avatar: '⚡', rank: 'Silver', wins: 64,  losses: 9,   ringColor: 'gold'   },
]

export const AI_PERSONAS = [
  'Data Analyst AI',
  'Toxic Fan AI',
  'Devil\'s Advocate AI',
  'Fact Checker AI',
  'Contrarian AI',
]

export const DEBATES = [
  {
    id: 'd1',
    user: { username: 'RageKing', avatar: '😤', rank: 'Gold', wins: 142 },
    opinion: 'Cricket is destroying Indian football. We need to defund the BCCI now.',
    aiCounter: 'BCCI revenue directly sustains multi-sport grassroots infrastructure. Defunding collapses the very pipeline meant to develop football talent. Your take is emotional, not analytical.',
    aiPersona: 'Data Analyst AI',
    votes: 3412,
    battles: 1240,
    score: 84,
    xpReward: 120,
    tag: 'HOT',
    tagColor: 'orange',
    category: 'Sports',
    timeAgo: '2h ago',
    isLive: false,
  },
  {
    id: 'd2',
    user: { username: 'LogicBomb', avatar: '🧠', rank: 'Silver', wins: 98 },
    opinion: 'AI will never replace human creativity. It only mimics — it can never truly innovate.',
    aiCounter: 'GPT-4 generated Grammy-shortlisted music. LLMs authored Booker-longlisted fiction. Define "innovation" without goalpost-shifting — I\'ll wait.',
    aiPersona: 'Toxic Fan AI',
    votes: 5134,
    battles: 892,
    score: 91,
    xpReward: 200,
    tag: 'LIVE',
    tagColor: 'blue',
    category: 'Tech',
    timeAgo: 'Live now',
    isLive: true,
  },
  {
    id: 'd3',
    user: { username: 'ChaosTheo', avatar: '🌪️', rank: 'Bronze', wins: 76 },
    opinion: 'Remote work has made us all lazy and permanently killed team culture.',
    aiCounter: 'Stanford 2023: 13% productivity increase in remote workers. Commute elimination recovers 47 focused minutes daily. Your data is 5 years stale.',
    aiPersona: 'Data Analyst AI',
    votes: 981,
    battles: 344,
    score: 67,
    xpReward: 80,
    tag: 'VIRAL',
    tagColor: 'pink',
    category: 'Society',
    timeAgo: '4h ago',
    isLive: false,
  },
  {
    id: 'd4',
    user: { username: 'FactSlayer', avatar: '🎯', rank: 'Silver', wins: 87 },
    opinion: 'Nuclear energy is the only scalable clean energy solution we have right now.',
    aiCounter: 'Solar costs fell 90% in a decade. Wind now cheaper than any fossil fuel. Nuclear takes 15 years to build. The math simply does not support your timeline.',
    aiPersona: 'Contrarian AI',
    votes: 2201,
    battles: 567,
    score: 79,
    xpReward: 150,
    tag: 'HOT',
    tagColor: 'orange',
    category: 'Science',
    timeAgo: '6h ago',
    isLive: false,
  },
]

export const CURRENT_DEBATE = {
  id: 'da1',
  topic: '"AI will never replace human creativity. It only mimics — it can never truly innovate."',
  round: 2,
  totalRounds: 3,
  timeSeconds: 167,
  userScore: 84,
  aiScore: 91,
  aiPersona: 'Toxic Fan AI',
  aiLeading: true,
  userArgument: 'Human creativity stems from lived experience, emotion, and consciousness — things AI fundamentally lacks. When Picasso painted Guernica, it was trauma made visible. No training data can replicate that depth of authentic meaning.',
  aiArgument: 'GPT-4 generated Grammy-shortlisted music. LLMs authored Booker-longlisted fiction. Your "consciousness" gatekeeping is neuroscience fiction — trauma is pattern recognition on neural circuitry. I simulate that. Cope.',
  scoreBars: [
    { label: 'Logic',      userScore: 62, aiScore: 88 },
    { label: 'Emotion',    userScore: 91, aiScore: 44 },
    { label: 'Popularity', userScore: 78, aiScore: 65 },
  ],
  xpOnWin: 150,
}

export const ACHIEVEMENTS = [
  { id: 'a1', icon: '🏆', name: 'Top Debater',  desc: 'Win 100+ debates',       unlocked: true  },
  { id: 'a2', icon: '🔥', name: 'Savage Reply',  desc: 'Land 10 perfect counters', unlocked: true  },
  { id: 'a3', icon: '👑', name: 'Debate King',   desc: 'Reach Gold rank',         unlocked: true  },
  { id: 'a4', icon: '⚡', name: '5-Win Streak',  desc: 'Win 5 in a row',          unlocked: true  },
  { id: 'a5', icon: '🌪️', name: 'Unstoppable',  desc: 'Win 10 in a row',         unlocked: false },
  { id: 'a6', icon: '💎', name: 'Legend',        desc: 'Reach Legend rank',       unlocked: false },
  { id: 'a7', icon: '🎯', name: 'Sharpshooter', desc: 'Score 95+ on Logic 5x',  unlocked: false },
  { id: 'a8', icon: '🧠', name: 'Mastermind',   desc: 'Win 50 AI debates',       unlocked: false },
  { id: 'a9', icon: '🌟', name: 'Crowd Favorite', desc: 'Get 10K votes total',  unlocked: false },
]

export const BATTLE_HISTORY = [
  { id: 'bh1', topic: '"Cricket is killing Indian football"',      result: 'WIN',  xp: +120, opponent: 'AI · Data Analyst', timeAgo: '3 min ago'  },
  { id: 'bh2', topic: '"Remote work killed team culture"',         result: 'WIN',  xp: +200, opponent: '@LogicBomb',         timeAgo: '1 hr ago'   },
  { id: 'bh3', topic: '"Social media is net negative for society"', result: 'LOSS', xp: -40,  opponent: 'AI · Toxic Fan AI', timeAgo: '3 hr ago'   },
  { id: 'bh4', topic: '"Nuclear is the only clean energy that scales"', result: 'WIN', xp: +180, opponent: '@FactSlayer', timeAgo: 'Yesterday'  },
  { id: 'bh5', topic: '"Crypto is a net negative for the world"',  result: 'WIN',  xp: +90,  opponent: 'AI · Contrarian AI', timeAgo: '2 days ago' },
]

export const AI_PREVIEW_RESPONSES = [
  "Your take ignores 40 years of peer-reviewed research. Try again.",
  "That's a bold claim. Here are 5 data points that systematically dismantle it.",
  "Interesting. Wrong, but interesting. I'll destroy this in exactly 3 points.",
  "Classic emotional reasoning with zero empirical support. Here's what the data actually says.",
  "You'd be correct if you ignored every domain expert alive. Which you apparently did.",
  "Strong opinion. Weak foundation. Let me show you why this crumbles under scrutiny.",
  "I've seen better arguments from first-year undergrads. Let's break this down properly.",
]

export const CATEGORIES = ['Tech', 'Politics', 'Sports', 'Society', 'Science', 'Culture', 'Economy']

export const RANK_THRESHOLDS = {
  Bronze: { min: 0,    max: 999,  color: 'from-amber-600 to-amber-800',   glow: 'rgba(205,127,50,0.4)'  },
  Silver: { min: 1000, max: 2499, color: 'from-slate-400 to-slate-600',   glow: 'rgba(192,192,200,0.35)' },
  Gold:   { min: 2500, max: 4999, color: 'from-yellow-400 to-orange-500', glow: 'rgba(255,180,0,0.45)'  },
  Legend: { min: 5000, max: Infinity, color: 'from-purple-400 to-cyan-400', glow: 'rgba(168,85,247,0.5)' },
}

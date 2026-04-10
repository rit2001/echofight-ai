# ⚔️ EchoFight — Battle Arena

> AI-native competitive debate platform. Drop your hot take, face the AI, dominate.

## Stack
- **React 18** + **Vite 5**
- **Tailwind CSS 3** (custom gaming token system)
- **Framer Motion 11** (page transitions, card hovers, score bar animations)
- **React Router 6** (client-side routing)

## Quick Start

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home Feed | Debate cards, top debaters, live battles |
| `/create` | Create Post | Hot take input with live AI preview |
| `/arena` | Debate Arena | Full battle UI with score bars + timer |
| `/profile` | Profile | Rank, XP bar, achievements, history |

## Component Map

```
src/
├── components/
│   ├── Navbar.jsx          Global XP bar + win streak + bottom nav
│   ├── DebateCard.jsx      Feed card with opinion + AI counter + join CTA
│   ├── AIResponseCard.jsx  Glowing AI response block with persona tag
│   ├── ScoreBar.jsx        Animated dual-track score bar (user vs AI)
│   ├── XPBar.jsx           Animated XP progress bar (compact + full)
│   ├── RankBadge.jsx       Bronze / Silver / Gold / Legend badge
│   ├── Button.jsx          Animated button with shimmer (4 variants)
│   └── Badge.jsx           Status chips (HOT / LIVE / VIRAL / WIN / LOSS)
│
├── pages/
│   ├── HomeFeed.jsx        Main feed page
│   ├── CreatePost.jsx      Create battle page
│   ├── DebateArena.jsx     Full arena screen
│   └── Profile.jsx         Gamified profile page
│
├── hooks/
│   └── useDebate.js        useTimer / useXPToast / useDebate / useAIPreview
│
└── utils/
    └── mockData.js         All mock data (debates, users, achievements)
```

## Design Tokens (Tailwind)

| Token | Value | Usage |
|---|---|---|
| `nblue` | `#00CFFF` | AI accent, live badges |
| `npurple` | `#7C3AED` | User accent, CTA buttons |
| `npink` | `#F0156B` | Viral tag, notifications |
| `gold` | `#FFB400` | Rank badges, winner crown |
| `green` | `#00E676` | XP gains, win badges |
| `red` | `#FF3040` | Timer, loss badges |
| `s0–s4` | `#0A0C16–#202646` | Surface layers |

## Fonts
- **Chakra Petch** — UI chrome, labels, nav, badges
- **Exo 2** — Debate copy, opinions, arguments
- **Share Tech Mono** — Numbers, stats, counters

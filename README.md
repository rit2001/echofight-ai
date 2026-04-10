<div align="center">

# ⚔️ EchoFight AI

### India's First AI-Powered Competitive Debate Platform

**Where Every Opinion Meets Its Match**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991?style=flat-square&logo=openai)](https://openai.com)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

[**Live Demo**](https://echofight-ai.vercel.app/) · [**Repo**](https://github.com/rit2001/echofight-ai/tree/main) ·  [**Frontend Repo**](https://github.com/rit2001/echofight-ai/tree/main/frontend) · [**Backend Repo**](https://github.com/rit2001/echofight-ai/tree/main/backend)

---

![EchoFight Banner](https://via.placeholder.com/900x300/06080F/7C3AED?text=EchoFight+AI+%E2%9A%94%EF%B8%8F+Debate+Arena)

</div>

---

## 🧠 What is EchoFight?

EchoFight is an **AI-native competitive debate platform** where users post opinions, face real-time AI counter-arguments, and compete in structured debate arenas — all within a gamified, mobile-first experience inspired by competitive gaming.

It is not a chatbot. It is not a quiz app. It is a **debate sport** — designed to build critical thinking as a social habit at scale.

> *"Instead of echo chambers, EchoFight creates intellectual friction."*

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Debate Arena** | Post any opinion → receive a sharp, personalised AI counter in <2 seconds |
| ⚔️ **Battle System** | Structured User vs. AI rounds with timer, argument history, and winner detection |
| 📊 **Multi-Dimensional Scoring** | Logic, Emotion, and Popularity scores per argument — real-time score bars |
| 🏆 **Gamification Layer** | XP points, Bronze → Silver → Gold → Legend ranks, win streaks, achievement badges |
| 🌐 **Social Feed** | Public debate cards, vote counts, live battle indicators, "Join Battle" CTAs |
| 🎭 **AI Personas** | Data Analyst AI, Toxic Fan AI, Devil's Advocate AI, Contrarian AI — each with distinct debate style |
| 📱 **Responsive Design** | Mobile-first (390px) → Tablet → Full desktop with sidebar layout (1440px+) |
| ⚡ **Live AI Preview** | Debounced real-time AI counter preview as you type your opinion |

---

## 🛠️ Tech Stack

### Frontend
```
React 18          → Component framework
Vite 5            → Build tool (HMR, fast builds)
Tailwind CSS 3    → Utility-first styling with custom gaming token system
Framer Motion 11  → Page transitions, card hovers, score bar animations
React Router 6    → Client-side routing
```

### Backend
```
FastAPI           → Async Python web framework
Uvicorn           → ASGI server with hot-reload
OpenAI API        → GPT-3.5-turbo for debate counter-arguments
Pydantic v2       → Request/response validation
pydantic-settings → Environment variable management
```

### Infrastructure
```
Vercel            → Frontend deployment (auto-deploys on push)
Railway / Render  → Backend deployment (free tier available)
```

---

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- Python 3.10+
- An OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### Step 1 — Clone Both Repos

```bash
git clone https://github.com/rit2001/echofight-frontend
git clone https://github.com/rit2001/echofight-backend
```

### Step 2 — Backend Setup

```bash
cd echofight-backend

# Create virtual environment
python -m venv venv

# Activate
source venv/bin/activate          # Mac / Linux
# venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Open .env → replace OPENAI_API_KEY=your_key_here

# Start server
bash run.sh
# → Running at http://localhost:8000
# → Swagger docs at http://localhost:8000/docs
```

### Step 3 — Frontend Setup (new terminal)

```bash
cd echofight-frontend

# Install dependencies
npm install

# Start dev server
npm run dev
# → Running at http://localhost:5173
```

### Step 4 — Environment Variables

**`echofight-frontend/.env`**
```env
VITE_API_URL=http://localhost:8000
```

**`echofight-backend/.env`**
```env
OPENAI_API_KEY=your_openai_api_key_here
ALLOWED_ORIGIN=http://localhost:5173
```

---

## 📡 API Reference

### `GET /`
Health check endpoint.

**Response:**
```json
{ "message": "EchoFight API running" }
```

### `POST /api/counter`
Generate an AI counter-argument for a given debate argument.

**Request:**
```json
{
  "argument": "AI will never replace human creativity."
}
```

**Response:**
```json
{
  "ai_response": "GPT-4 generated Grammy-shortlisted music. LLMs authored Booker-longlisted fiction. Define innovation without moving the goalposts — I'll wait."
}
```

**Error responses:**
| Code | Meaning |
|---|---|
| 422 | Empty or too-short argument |
| 502 | OpenAI API error |
| 500 | Unexpected server error |

---

## 🗂️ Project Structure

```
echofight-frontend/
├── src/
│   ├── components/
│   │   ├── AIResponseCard.jsx    Glowing AI block with scan-line & persona tag
│   │   ├── Badge.jsx             HOT / LIVE / VIRAL / WIN / LOSS status chips
│   │   ├── Button.jsx            5 variants with shimmer + spring animation
│   │   ├── DebateCard.jsx        Feed card with opinion, AI counter, join CTA
│   │   ├── Navbar.jsx            Desktop sidebar + mobile bottom nav
│   │   ├── RankBadge.jsx         Bronze / Silver / Gold / Legend gradient pill
│   │   ├── ScoreBar.jsx          Dual-track animated bar (user vs AI)
│   │   └── XPBar.jsx             Animated XP progress (compact + full modes)
│   ├── pages/
│   │   ├── HomeFeed.jsx          Main feed with 2-col desktop layout
│   │   ├── CreatePost.jsx        Create battle + live AI preview
│   │   ├── DebateArena.jsx       Full arena with side-by-side arguments
│   │   └── Profile.jsx           Gamified profile, achievements, history
│   ├── hooks/
│   │   └── useDebate.js          useTimer, useXPToast, useAIPreview (real API)
│   └── utils/
│       ├── api.js                Centralised fetch utility (VITE_API_URL)
│       └── mockData.js           Mock data for non-API screens
│
echofight-backend/
├── app/
│   ├── main.py                   FastAPI app + CORS + router registration
│   ├── core/config.py            Pydantic Settings → loads .env
│   ├── models/schemas.py         CounterRequest + CounterResponse models
│   ├── routes/debate.py          POST /api/counter route handler
│   └── services/ai_service.py   OpenAI async call + system prompt + error handling
├── .env                          API keys (never commit)
├── requirements.txt
└── run.sh
```

---

## 🚢 Deployment

### Frontend → Vercel
```bash
# 1. Push to GitHub
# 2. Connect repo at vercel.com/new
# 3. Add environment variable: VITE_API_URL=https://your-backend.railway.app
# 4. Deploy — auto-deploys on every push to main
```

### Backend → Railway
```bash
# 1. Push to GitHub
# 2. Create new project at railway.app
# 3. Add environment variables:
#    OPENAI_API_KEY=sk-...
#    ALLOWED_ORIGIN=https://your-app.vercel.app
# 4. Railway auto-detects FastAPI and deploys
```

> **After deploying:** Update `ALLOWED_ORIGIN` in the backend to your actual Vercel URL to allow CORS.

---

## 💡 Alternative AI Provider (Free)

If you don't want to use OpenAI, **Google Gemini** offers a completely free tier (no credit card required).

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com), then update `ai_service.py`:

```python
# Replace the OpenAI client with:
import google.generativeai as genai
genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

async def get_ai_counter(argument: str) -> str:
    response = model.generate_content(
        f"{SYSTEM_PROMPT}\n\nUser argument: {argument}"
    )
    return response.text.strip()
```

---

## 🎯 Product Roadmap

- [x] AI Debate Arena (User vs AI)
- [x] Gamification layer (XP, Ranks, Streaks)
- [x] Social feed with debate cards
- [x] Live AI preview on Create page
- [x] Responsive design (mobile + desktop)
- [ ] PvP Mode (Human vs Human, AI as judge)
- [ ] Debate Portfolio (shareable profile for LinkedIn/resume)
- [ ] Audio debates with speech scoring
- [ ] Topic packs for UPSC / MBA GD-PI / Interview Prep
- [ ] Multilingual support (Hindi, Tamil, Bengali)

---

## 🏗️ Built By

**Ritwik Biswas**
Dual Degree (M.Tech), Mechanical Engineering + CSE Minor
Indian Institute of Technology Kharagpur (2021–2026)

- GitHub: [@rit2001](https://github.com/rit2001)
- LinkedIn: [linkedin.com/in/ritwikbiswas](https://linkedin.com/in/ritwikbiswas)

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**EchoFight AI — Where Every Opinion Meets Its Match. ⚔️**

*Built at IIT Kharagpur · 2025*

</div>


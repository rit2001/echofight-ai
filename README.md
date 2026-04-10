# ⚔️ EchoFight — Full Stack App

AI-native competitive debate platform.

---

## Folder Structure

```
EchoFight/
├── frontend/     React + Vite + Tailwind + Framer Motion
└── backend/      FastAPI + OpenAI
```

---

## Run Instructions

### Step 1 — Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate        # Mac / Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Add your OpenAI API key
# Open backend/.env and replace: your_openai_api_key_here
# with your actual key from https://platform.openai.com/api-keys

# Start server
bash run.sh
```

Backend runs at → **http://localhost:8000**
Swagger docs at → **http://localhost:8000/docs**

---

### Step 2 — Frontend (new terminal)

```bash
cd frontend

npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

## API Key Setup

Open `backend/.env`:
```
OPENAI_API_KEY=your_openai_api_key_here   ← replace this
ALLOWED_ORIGIN=http://localhost:5173
```

---

## Tech Stack

| Layer     | Stack                                      |
|-----------|--------------------------------------------|
| Frontend  | React 18, Vite 5, Tailwind CSS, Framer Motion |
| Backend   | FastAPI, Uvicorn, OpenAI API, Pydantic     |

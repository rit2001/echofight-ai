# ⚔️ EchoFight — Backend API

FastAPI backend powering the EchoFight AI debate platform.

---

## Quick Start

```bash
# 1. Create and activate virtual environment
python -m venv venv
source venv/bin/activate        # Mac/Linux
venv\Scripts\activate           # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Add your OpenAI API key to .env
#    Open .env and replace: your_openai_api_key_here

# 4. Run the server
bash run.sh
# OR directly:
uvicorn app.main:app --reload --port 8000
```

Server starts at **http://localhost:8000**

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Health check |
| POST | `/api/counter` | Get AI counter-argument |
| GET | `/docs` | Swagger UI (auto-generated) |
| GET | `/redoc` | ReDoc docs (auto-generated) |

---

## POST /api/counter

**Request:**
```json
{
  "argument": "AI will never replace human creativity."
}
```

**Response:**
```json
{
  "ai_response": "GPT-4 generated Grammy-shortlisted music..."
}
```

**Error responses:**
```json
{ "detail": "Argument cannot be empty or whitespace." }       // 422
{ "detail": "OpenAI API error: ..." }                         // 502
{ "detail": "Unexpected error: ..." }                         // 500
```

---

## Folder Structure

```
backend/
├── app/
│   ├── main.py               FastAPI app + CORS + router registration
│   ├── core/
│   │   └── config.py         Pydantic Settings — loads .env
│   ├── models/
│   │   └── schemas.py        Request/Response Pydantic models
│   ├── routes/
│   │   └── debate.py         POST /api/counter route
│   └── services/
│       └── ai_service.py     OpenAI call + error handling
├── .env                      API keys (never commit this)
├── requirements.txt
└── run.sh
```

---

## Connect to Frontend

In your EchoFight React app (`hooks/useDebate.js`), replace the mock trigger with:

```js
const res = await fetch('http://localhost:8000/api/counter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ argument: inputText }),
})
const data = await res.json()
setResponse(data.ai_response)
```

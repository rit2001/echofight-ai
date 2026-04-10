from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.models.schemas import HealthResponse
from app.routes import debate

# ── App init ──────────────────────────────────────────────────────
app = FastAPI(
    title="EchoFight API",
    description="AI-powered debate backend for EchoFight",
    version="1.0.0",
)

# ── CORS ──────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGIN],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────
app.include_router(debate.router)


# ── Health check ──────────────────────────────────────────────────
@app.get("/", response_model=HealthResponse, tags=["health"])
async def health_check() -> HealthResponse:
    return HealthResponse(message="EchoFight API running")

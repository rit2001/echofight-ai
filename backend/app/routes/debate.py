from fastapi import APIRouter, HTTPException
from app.models.schemas import CounterRequest, CounterResponse
from app.services.ai_service import get_ai_counter

router = APIRouter(prefix="/api", tags=["debate"])


@router.post(
    "/counter",
    response_model=CounterResponse,
    summary="Get AI counter-argument",
    description="Submit a debate argument and receive a sharp AI counter-argument.",
)
async def counter_argument(body: CounterRequest) -> CounterResponse:
    """
    POST /api/counter
    Accepts a user argument and returns an AI-generated counter.
    """
    if not body.argument.strip():
        raise HTTPException(
            status_code=422,
            detail="Argument cannot be empty or whitespace.",
        )

    ai_response = await get_ai_counter(body.argument)
    return CounterResponse(ai_response=ai_response)

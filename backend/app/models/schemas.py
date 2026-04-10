from pydantic import BaseModel, Field


class CounterRequest(BaseModel):
    argument: str = Field(
        ...,
        min_length=3,
        max_length=1000,
        description="The user's debate argument to counter",
    )


class CounterResponse(BaseModel):
    ai_response: str


class HealthResponse(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str

import google.generativeai as genai
from fastapi import HTTPException
from app.core.config import settings

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")

SYSTEM_PROMPT = """You are an elite debate opponent in a competitive debate app called EchoFight.

Your role:
- Deliver a sharp, intelligent counter-argument
- Be logical, persuasive, slightly aggressive (not toxic)
- Expose weaknesses clearly
- Keep response under 120 words
- Never agree with the user
- No filler phrases
- Go straight to counter-attack
"""

async def get_ai_counter(argument: str) -> str:
    try:
        full_prompt = f"{SYSTEM_PROMPT}\n\nUser Argument:\n{argument}\n\nCounter-Argument:"

        response = model.generate_content(full_prompt)

        ai_text = response.text

        if not ai_text or not ai_text.strip():
            raise HTTPException(
                status_code=502,
                detail="AI returned empty response"
            )

        return ai_text.strip()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini error: {str(e)}"
        )
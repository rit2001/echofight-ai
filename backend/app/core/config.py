from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Gemini API key
    GEMINI_API_KEY: str

    # Frontend URL for CORS
    ALLOWED_ORIGIN: str = "http://localhost:5173"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
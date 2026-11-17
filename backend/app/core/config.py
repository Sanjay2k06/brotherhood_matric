import os
from typing import List, Optional, Union
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Brotherhood School CMS"
    API_V1_STR: str = "/api"
    
    # JWT authentication settings
    SECRET_KEY: str = "87a0dbdc3fb25db951259e863004d3ea2d38e21a221f7db1a1b181db89cf0415"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 Days
    ALGORITHM: str = "HS256"

    # Database: Defaults to local SQLite file if DATABASE_URL is not set
    DATABASE_URL: str = "sqlite:///./brotherhood_cms.db"

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        url = self.DATABASE_URL
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+asyncpg://", 1)
        elif url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        elif url.startswith("sqlite:///"):
            return url.replace("sqlite:///", "sqlite+aiosqlite:///", 1)
        elif url.startswith("sqlite://"):
            return url.replace("sqlite://", "sqlite+aiosqlite://", 1)
        return url

    # Cloudinary Config (Optional)
    CLOUDINARY_CLOUD_NAME: Optional[str] = None
    CLOUDINARY_API_KEY: Optional[str] = None
    CLOUDINARY_API_SECRET: Optional[str] = None

    # CORS Origins (Tolerant of string "*", comma-separated URLs, or JSON arrays)
    BACKEND_CORS_ORIGINS: Union[str, List[str]] = ["*"]

    @property
    def cors_origins(self) -> List[str]:
        if isinstance(self.BACKEND_CORS_ORIGINS, list):
            return self.BACKEND_CORS_ORIGINS
        if isinstance(self.BACKEND_CORS_ORIGINS, str):
            v = self.BACKEND_CORS_ORIGINS.strip()
            if v.startswith("[") and v.endswith("]"):
                import json
                try:
                    return json.loads(v)
                except Exception:
                    pass
            return [i.strip() for i in v.split(",") if i.strip()]
        return ["*"]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()

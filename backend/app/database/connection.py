from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings
from app.core.logging import logger

engine_options = {}
if settings.ASYNC_DATABASE_URL.startswith("postgresql"):
    engine_options = {
        "pool_pre_ping": True,
        "pool_size": 10,
        "max_overflow": 20,
    }

logger.info(f"Connecting to database using async URL: {settings.ASYNC_DATABASE_URL}")

engine = create_async_engine(
    settings.ASYNC_DATABASE_URL,
    **engine_options
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

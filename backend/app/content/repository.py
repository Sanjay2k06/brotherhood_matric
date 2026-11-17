import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.content.models import Page

class PageRepository(AsyncBaseRepository[Page]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Page)

    async def get_by_slug(self, slug: str) -> Optional[Page]:
        stmt = select(Page).filter(Page.slug == slug, Page.deleted_at.is_(None))
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

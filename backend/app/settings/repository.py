from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.settings.models import WebsiteSettings

class SettingsRepository(AsyncBaseRepository[WebsiteSettings]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, WebsiteSettings)

    async def get_singleton(self) -> WebsiteSettings:
        stmt = select(WebsiteSettings)
        result = await self.db.execute(stmt)
        record = result.scalars().first()
        if not record:
            record = WebsiteSettings()
            self.db.add(record)
            await self.db.commit()
            await self.db.refresh(record)
        return record

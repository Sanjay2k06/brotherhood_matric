import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.settings.repository import SettingsRepository
from app.settings.schemas import WebsiteSettingsUpdate
from app.settings.models import WebsiteSettings

class SettingsService:
    def __init__(self, db: AsyncSession):
        self.repo = SettingsRepository(db)

    async def get_settings(self) -> WebsiteSettings:
        return await self.repo.get_singleton()

    async def update_settings(self, payload: WebsiteSettingsUpdate, user_id: uuid.UUID) -> WebsiteSettings:
        record = await self.repo.get_singleton()
        return await self.repo.update(record, payload.model_dump(exclude_unset=True), user_id=user_id)

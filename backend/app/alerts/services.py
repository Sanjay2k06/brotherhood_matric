import uuid
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.alerts.repository import AlertRepository
from app.alerts.schemas import AnnouncementCreate, AnnouncementUpdate
from app.alerts.models import Announcement

class AlertService:
    def __init__(self, db: AsyncSession):
        self.repo = AlertRepository(db)

    async def get_all(self, active_only: bool = False) -> List[Announcement]:
        if active_only:
            return await self.repo.get_active()
        return await self.repo.get_all()

    async def get_by_id(self, announcement_id: uuid.UUID) -> Announcement:
        item = await self.repo.get_by_id(announcement_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Announcement not found"
            )
        return item

    async def create(self, payload: AnnouncementCreate, user_id: uuid.UUID) -> Announcement:
        if payload.status == "Active":
            await self.repo.deactivate_all_active()
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, announcement_id: uuid.UUID, payload: AnnouncementUpdate, user_id: uuid.UUID) -> Announcement:
        item = await self.get_by_id(announcement_id)
        if payload.status == "Active":
            await self.repo.deactivate_all_active(exclude_id=announcement_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, announcement_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(announcement_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Announcement deleted successfully"}

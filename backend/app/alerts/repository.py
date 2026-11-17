import uuid
from typing import Optional, List
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.alerts.models import Announcement

class AlertRepository(AsyncBaseRepository[Announcement]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Announcement)

    async def get_active(self) -> List[Announcement]:
        stmt = select(Announcement).filter(
            Announcement.status == "Active",
            Announcement.deleted_at.is_(None)
        )
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def deactivate_all_active(self, exclude_id: Optional[uuid.UUID] = None):
        stmt = update(Announcement).filter(
            Announcement.status == "Active",
            Announcement.deleted_at.is_(None)
        )
        if exclude_id:
            stmt = stmt.filter(Announcement.id != exclude_id)
        stmt = stmt.values(status="Inactive")
        await self.db.execute(stmt)
        await self.db.commit()

import uuid
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.events.repository import EventRepository
from app.events.schemas import EventCreate, EventUpdate
from app.events.models import Event

class EventService:
    def __init__(self, db: AsyncSession):
        self.repo = EventRepository(db)

    async def get_all(
        self, 
        featured: Optional[bool] = None, 
        upcoming: Optional[bool] = None, 
        category: Optional[str] = None,
        status_filter: Optional[str] = None
    ) -> List[Event]:
        stmt = select(Event).filter(Event.deleted_at.is_(None))
        
        if featured is not None:
            stmt = stmt.filter(Event.is_featured == featured)
        if upcoming is not None:
            stmt = stmt.filter(Event.is_upcoming == upcoming)
        if category is not None:
            stmt = stmt.filter(Event.category == category)
        if status_filter is not None:
            stmt = stmt.filter(Event.status == status_filter)
            
        stmt = stmt.order_by(Event.event_date.asc())
        result = await self.repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(self, event_id: uuid.UUID) -> Event:
        item = await self.repo.get_by_id(event_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Event not found"
            )
        return item

    async def create(self, payload: EventCreate, user_id: uuid.UUID) -> Event:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, event_id: uuid.UUID, payload: EventUpdate, user_id: uuid.UUID) -> Event:
        item = await self.get_by_id(event_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, event_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(event_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Event deleted successfully"}

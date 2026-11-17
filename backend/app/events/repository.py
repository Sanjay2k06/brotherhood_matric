from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.events.models import Event

class EventRepository(AsyncBaseRepository[Event]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Event)

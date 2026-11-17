from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.leaders.models import StudentLeader

class LeaderRepository(AsyncBaseRepository[StudentLeader]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, StudentLeader)

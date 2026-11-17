from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.houses.models import StudentHouse

class HouseRepository(AsyncBaseRepository[StudentHouse]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, StudentHouse)

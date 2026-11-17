from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.achievements.models import StudentAchievement

class AchievementRepository(AsyncBaseRepository[StudentAchievement]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, StudentAchievement)

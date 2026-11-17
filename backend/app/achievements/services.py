import uuid
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.achievements.repository import AchievementRepository
from app.achievements.schemas import StudentAchievementCreate, StudentAchievementUpdate
from app.achievements.models import StudentAchievement

class AchievementService:
    def __init__(self, db: AsyncSession):
        self.repo = AchievementRepository(db)

    async def get_all(self) -> List[StudentAchievement]:
        return await self.repo.get_all()

    async def get_by_id(self, achievement_id: uuid.UUID) -> StudentAchievement:
        item = await self.repo.get_by_id(achievement_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Achievement not found"
            )
        return item

    async def create(self, payload: StudentAchievementCreate, user_id: uuid.UUID) -> StudentAchievement:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, achievement_id: uuid.UUID, payload: StudentAchievementUpdate, user_id: uuid.UUID) -> StudentAchievement:
        item = await self.get_by_id(achievement_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, achievement_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(achievement_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Achievement deleted successfully"}

import uuid
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.leaders.repository import LeaderRepository
from app.leaders.schemas import StudentLeaderCreate, StudentLeaderUpdate
from app.leaders.models import StudentLeader

class LeaderService:
    def __init__(self, db: AsyncSession):
        self.repo = LeaderRepository(db)

    async def get_all(self) -> List[StudentLeader]:
        return await self.repo.get_all()

    async def get_by_id(self, leader_id: uuid.UUID) -> StudentLeader:
        item = await self.repo.get_by_id(leader_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Student leader not found"
            )
        return item

    async def create(self, payload: StudentLeaderCreate, user_id: uuid.UUID) -> StudentLeader:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, leader_id: uuid.UUID, payload: StudentLeaderUpdate, user_id: uuid.UUID) -> StudentLeader:
        item = await self.get_by_id(leader_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, leader_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(leader_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Leader deleted successfully"}

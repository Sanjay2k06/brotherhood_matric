import uuid
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.houses.repository import HouseRepository
from app.houses.schemas import StudentHouseCreate, StudentHouseUpdate
from app.houses.models import StudentHouse

class HouseService:
    def __init__(self, db: AsyncSession):
        self.repo = HouseRepository(db)

    async def get_all(self) -> List[StudentHouse]:
        return await self.repo.get_all()

    async def get_by_id(self, house_id: uuid.UUID) -> StudentHouse:
        item = await self.repo.get_by_id(house_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="School house not found"
            )
        return item

    async def create(self, payload: StudentHouseCreate, user_id: uuid.UUID) -> StudentHouse:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, house_id: uuid.UUID, payload: StudentHouseUpdate, user_id: uuid.UUID) -> StudentHouse:
        item = await self.get_by_id(house_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, house_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(house_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "House deleted successfully"}

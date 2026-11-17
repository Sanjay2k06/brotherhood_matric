import uuid
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.uniforms.repository import UniformRepository
from app.uniforms.schemas import SchoolUniformCreate, SchoolUniformUpdate
from app.uniforms.models import SchoolUniform

class UniformService:
    def __init__(self, db: AsyncSession):
        self.repo = UniformRepository(db)

    async def get_all(self) -> List[SchoolUniform]:
        return await self.repo.get_all()

    async def get_by_id(self, uniform_id: uuid.UUID) -> SchoolUniform:
        item = await self.repo.get_by_id(uniform_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="School uniform section not found"
            )
        return item

    async def create(self, payload: SchoolUniformCreate, user_id: uuid.UUID) -> SchoolUniform:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, uniform_id: uuid.UUID, payload: SchoolUniformUpdate, user_id: uuid.UUID) -> SchoolUniform:
        item = await self.get_by_id(uniform_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, uniform_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(uniform_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Uniform deleted successfully"}

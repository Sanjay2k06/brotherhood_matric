import uuid
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.teachers.repository import TeacherRepository
from app.teachers.schemas import TeacherCreate, TeacherUpdate
from app.teachers.models import Teacher

class TeacherService:
    def __init__(self, db: AsyncSession):
        self.repo = TeacherRepository(db)

    async def get_all(self, subject: Optional[str] = None) -> List[Teacher]:
        stmt = select(Teacher).filter(Teacher.deleted_at.is_(None))
        if subject:
            stmt = stmt.filter(Teacher.subject == subject)
        stmt = stmt.order_by(Teacher.name.asc())
        result = await self.repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(self, teacher_id: uuid.UUID) -> Teacher:
        item = await self.repo.get_by_id(teacher_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Teacher not found"
            )
        return item

    async def create(self, payload: TeacherCreate, user_id: uuid.UUID) -> Teacher:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, teacher_id: uuid.UUID, payload: TeacherUpdate, user_id: uuid.UUID) -> Teacher:
        item = await self.get_by_id(teacher_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, teacher_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(teacher_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Teacher deleted successfully"}

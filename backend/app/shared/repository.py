import uuid
from typing import Generic, TypeVar, Type, List, Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)

class AsyncBaseRepository(Generic[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.model = model

    async def get_by_id(self, id: uuid.UUID) -> Optional[ModelType]:
        stmt = select(self.model).filter(
            self.model.id == id,
            self.model.deleted_at.is_(None)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        stmt = select(self.model).filter(
            self.model.deleted_at.is_(None)
        ).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create(self, data: dict, user_id: Optional[uuid.UUID] = None) -> ModelType:
        db_obj = self.model(**data)
        if hasattr(db_obj, "created_by") and user_id:
            db_obj.created_by = user_id
        if hasattr(db_obj, "updated_by") and user_id:
            db_obj.updated_by = user_id
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def update(self, db_obj: ModelType, data: dict, user_id: Optional[uuid.UUID] = None) -> ModelType:
        for field, value in data.items():
            if value is not None:
                setattr(db_obj, field, value)
        if hasattr(db_obj, "updated_by") and user_id:
            db_obj.updated_by = user_id
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def soft_delete(self, db_obj: ModelType, user_id: Optional[uuid.UUID] = None) -> ModelType:
        db_obj.soft_delete()
        if hasattr(db_obj, "updated_by") and user_id:
            db_obj.updated_by = user_id
        self.db.add(db_obj)
        await self.db.commit()
        return db_obj

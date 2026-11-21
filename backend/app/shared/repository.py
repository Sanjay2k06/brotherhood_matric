import uuid
from typing import Generic, TypeVar, Type, List, Optional, Any
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)

class AsyncBaseRepository(Generic[ModelType]):
    def __init__(self, db: AsyncSession, model: Type[ModelType]):
        self.db = db
        self.model = model

    def _parse_uuid(self, val: Any) -> Optional[uuid.UUID]:
        if val is None:
            return None
        if isinstance(val, uuid.UUID):
            return val
        if isinstance(val, str):
            try:
                return uuid.UUID(val)
            except Exception:
                return None
        return None

    async def get_by_id(self, id: Any) -> Optional[ModelType]:
        target_uuid = self._parse_uuid(id)
        if target_uuid is None:
            return None

        stmt = select(self.model).filter(
            self.model.id == target_uuid,
            self.model.deleted_at.is_(None)
        )
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, skip: int = 0, limit: int = 1000) -> List[ModelType]:
        stmt = select(self.model).filter(
            self.model.deleted_at.is_(None)
        ).offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create(self, data: dict, user_id: Optional[Any] = None) -> ModelType:
        db_obj = self.model(**data)
        uid = self._parse_uuid(user_id)
        if hasattr(db_obj, "created_by") and uid:
            db_obj.created_by = uid
        if hasattr(db_obj, "updated_by") and uid:
            db_obj.updated_by = uid
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def update(self, db_obj: ModelType, data: dict, user_id: Optional[Any] = None) -> ModelType:
        for field, value in data.items():
            if value is not None:
                setattr(db_obj, field, value)
        uid = self._parse_uuid(user_id)
        if hasattr(db_obj, "updated_by") and uid:
            db_obj.updated_by = uid
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def soft_delete(self, db_obj: ModelType, user_id: Optional[Any] = None) -> ModelType:
        db_obj.soft_delete()
        uid = self._parse_uuid(user_id)
        if hasattr(db_obj, "updated_by") and uid:
            db_obj.updated_by = uid
        self.db.add(db_obj)
        await self.db.commit()
        return db_obj

import uuid
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.gallery.repository import GalleryRepository
from app.gallery.schemas import GalleryImageCreate, GalleryImageUpdate
from app.gallery.models import GalleryImage

class GalleryService:
    def __init__(self, db: AsyncSession):
        self.repo = GalleryRepository(db)

    async def get_all(
        self, 
        category: Optional[str] = None, 
        featured: Optional[bool] = None
    ) -> List[GalleryImage]:
        stmt = select(GalleryImage).filter(GalleryImage.deleted_at.is_(None))
        if category:
            stmt = stmt.filter(GalleryImage.category == category)
        if featured is not None:
            stmt = stmt.filter(GalleryImage.is_featured == featured)
        stmt = stmt.order_by(GalleryImage.sort_order.asc(), GalleryImage.created_at.desc())
        result = await self.repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(self, image_id: uuid.UUID) -> GalleryImage:
        item = await self.repo.get_by_id(image_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Gallery image not found"
            )
        return item

    async def create(self, payload: GalleryImageCreate, user_id: uuid.UUID) -> GalleryImage:
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, image_id: uuid.UUID, payload: GalleryImageUpdate, user_id: uuid.UUID) -> GalleryImage:
        item = await self.get_by_id(image_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, image_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(image_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Gallery image deleted successfully"}

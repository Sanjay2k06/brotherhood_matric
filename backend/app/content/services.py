import uuid
from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.content.repository import PageRepository
from app.content.schemas import PageCreate, PageUpdate
from app.content.models import Page

class PageService:
    def __init__(self, db: AsyncSession):
        self.repo = PageRepository(db)

    async def get_all(self) -> List[Page]:
        return await self.repo.get_all()

    async def get_by_id(self, page_id: uuid.UUID) -> Page:
        item = await self.repo.get_by_id(page_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Page not found"
            )
        return item

    async def get_by_slug(self, slug: str) -> Page:
        item = await self.repo.get_by_slug(slug)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Page with slug '{slug}' not found"
            )
        return item

    async def create(self, payload: PageCreate, user_id: uuid.UUID) -> Page:
        existing = await self.repo.get_by_slug(payload.slug)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Page with slug '{payload.slug}' already exists."
            )
        return await self.repo.create(payload.model_dump(), user_id=user_id)

    async def update(self, page_id: uuid.UUID, payload: PageUpdate, user_id: uuid.UUID) -> Page:
        item = await self.get_by_id(page_id)
        if payload.slug and payload.slug != item.slug:
            existing = await self.repo.get_by_slug(payload.slug)
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Page with slug '{payload.slug}' already exists."
                )
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, page_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(page_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Page deleted successfully"}

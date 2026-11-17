import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.gallery.schemas import GalleryImageCreate, GalleryImageUpdate, GalleryImageOut
from app.gallery.services import GalleryService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[GalleryImageOut])
async def list_images(
    category: str = None, 
    featured: bool = None, 
    db: AsyncSession = Depends(get_db)
):
    service = GalleryService(db)
    return await service.get_all(category=category, featured=featured)

@router.get("/{id}/", response_model=GalleryImageOut)
async def get_image(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = GalleryService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=GalleryImageOut, status_code=status.HTTP_201_CREATED)
async def create_image(
    payload: GalleryImageCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = GalleryService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=GalleryImageOut)
async def update_image(
    id: uuid.UUID, 
    payload: GalleryImageUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = GalleryService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_image(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = GalleryService(db)
    return await service.delete(id, user_id=current_user.id)

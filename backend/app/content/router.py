import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.content.schemas import PageCreate, PageUpdate, PageOut
from app.content.services import PageService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[PageOut])
async def list_pages(db: AsyncSession = Depends(get_db)):
    service = PageService(db)
    return await service.get_all()

@router.get("/{slug_or_id}/", response_model=PageOut)
async def get_page(slug_or_id: str, db: AsyncSession = Depends(get_db)):
    service = PageService(db)
    try:
        page_id = uuid.UUID(slug_or_id)
        return await service.get_by_id(page_id)
    except ValueError:
        return await service.get_by_slug(slug_or_id)

@router.post("/", response_model=PageOut, status_code=status.HTTP_201_CREATED)
async def create_page(
    payload: PageCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = PageService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=PageOut)
async def update_page(
    id: uuid.UUID, 
    payload: PageUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = PageService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_page(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = PageService(db)
    return await service.delete(id, user_id=current_user.id)

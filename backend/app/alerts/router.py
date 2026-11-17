import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.alerts.schemas import AnnouncementCreate, AnnouncementUpdate, AnnouncementOut
from app.alerts.services import AlertService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[AnnouncementOut])
async def list_announcements(active_only: bool = False, db: AsyncSession = Depends(get_db)):
    service = AlertService(db)
    return await service.get_all(active_only=active_only)

@router.get("/{id}/", response_model=AnnouncementOut)
async def get_announcement(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = AlertService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=AnnouncementOut, status_code=status.HTTP_201_CREATED)
async def create_announcement(
    payload: AnnouncementCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AlertService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=AnnouncementOut)
async def update_announcement(
    id: uuid.UUID, 
    payload: AnnouncementUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AlertService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_announcement(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AlertService(db)
    return await service.delete(id, user_id=current_user.id)

import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.events.schemas import EventCreate, EventUpdate, EventOut
from app.events.services import EventService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[EventOut])
async def list_events(
    featured: bool = None, 
    upcoming: bool = None, 
    category: str = None, 
    status: str = None,
    db: AsyncSession = Depends(get_db)
):
    service = EventService(db)
    return await service.get_all(featured=featured, upcoming=upcoming, category=category, status_filter=status)

@router.get("/{id}/", response_model=EventOut)
async def get_event(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = EventService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=EventOut, status_code=status.HTTP_201_CREATED)
async def create_event(
    payload: EventCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = EventService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=EventOut)
async def update_event(
    id: uuid.UUID, 
    payload: EventUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = EventService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_event(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = EventService(db)
    return await service.delete(id, user_id=current_user.id)

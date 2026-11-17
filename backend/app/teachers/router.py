import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.teachers.schemas import TeacherCreate, TeacherUpdate, TeacherOut
from app.teachers.services import TeacherService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[TeacherOut])
async def list_teachers(subject: str = None, db: AsyncSession = Depends(get_db)):
    service = TeacherService(db)
    return await service.get_all(subject=subject)

@router.get("/{id}/", response_model=TeacherOut)
async def get_teacher(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = TeacherService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=TeacherOut, status_code=status.HTTP_201_CREATED)
async def create_teacher(
    payload: TeacherCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = TeacherService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=TeacherOut)
async def update_teacher(
    id: uuid.UUID, 
    payload: TeacherUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = TeacherService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_teacher(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = TeacherService(db)
    return await service.delete(id, user_id=current_user.id)

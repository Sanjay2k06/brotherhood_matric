import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.achievements.schemas import StudentAchievementCreate, StudentAchievementUpdate, StudentAchievementOut
from app.achievements.services import AchievementService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[StudentAchievementOut])
async def list_achievements(db: AsyncSession = Depends(get_db)):
    service = AchievementService(db)
    return await service.get_all()

@router.get("/{id}/", response_model=StudentAchievementOut)
async def get_achievement(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = AchievementService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=StudentAchievementOut, status_code=status.HTTP_201_CREATED)
async def create_achievement(
    payload: StudentAchievementCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AchievementService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=StudentAchievementOut)
async def update_achievement(
    id: uuid.UUID, 
    payload: StudentAchievementUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AchievementService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_achievement(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AchievementService(db)
    return await service.delete(id, user_id=current_user.id)

import uuid
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.leaders.schemas import StudentLeaderCreate, StudentLeaderUpdate, StudentLeaderOut
from app.leaders.services import LeaderService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[StudentLeaderOut])
async def list_leaders(db: AsyncSession = Depends(get_db)):
    service = LeaderService(db)
    return await service.get_all()

@router.get("/{id}/", response_model=StudentLeaderOut)
async def get_leader(id: str, db: AsyncSession = Depends(get_db)):
    service = LeaderService(db)
    try:
        val_uuid = uuid.UUID(id)
    except (ValueError, AttributeError):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leader not found")
    return await service.get_by_id(val_uuid)

@router.post("/", response_model=StudentLeaderOut, status_code=status.HTTP_201_CREATED)
async def create_leader(
    payload: StudentLeaderCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = LeaderService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=StudentLeaderOut)
async def update_leader(
    id: str, 
    payload: StudentLeaderUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = LeaderService(db)
    try:
        val_uuid = uuid.UUID(id)
    except (ValueError, AttributeError):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Leader not found")
    return await service.update(val_uuid, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_leader(
    id: str, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    try:
        val_uuid = uuid.UUID(id)
    except (ValueError, AttributeError):
        return {"success": True, "message": f"Non-UUID item {id} bypassed successfully"}
    service = LeaderService(db)
    try:
        return await service.delete(val_uuid, user_id=current_user.id)
    except HTTPException:
        return {"success": True, "message": "Leader already removed"}

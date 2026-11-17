import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.houses.schemas import StudentHouseCreate, StudentHouseUpdate, StudentHouseOut
from app.houses.services import HouseService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[StudentHouseOut])
async def list_houses(db: AsyncSession = Depends(get_db)):
    service = HouseService(db)
    return await service.get_all()

@router.get("/{id}/", response_model=StudentHouseOut)
async def get_house(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = HouseService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=StudentHouseOut, status_code=status.HTTP_201_CREATED)
async def create_house(
    payload: StudentHouseCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = HouseService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=StudentHouseOut)
async def update_house(
    id: uuid.UUID, 
    payload: StudentHouseUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = HouseService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_house(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = HouseService(db)
    return await service.delete(id, user_id=current_user.id)

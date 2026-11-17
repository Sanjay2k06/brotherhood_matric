import uuid
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.uniforms.schemas import SchoolUniformCreate, SchoolUniformUpdate, SchoolUniformOut
from app.uniforms.services import UniformService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[SchoolUniformOut])
async def list_uniforms(db: AsyncSession = Depends(get_db)):
    service = UniformService(db)
    return await service.get_all()

@router.get("/{id}/", response_model=SchoolUniformOut)
async def get_uniform(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = UniformService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=SchoolUniformOut, status_code=status.HTTP_201_CREATED)
async def create_uniform(
    payload: SchoolUniformCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = UniformService(db)
    return await service.create(payload, user_id=current_user.id)

@router.put("/{id}/", response_model=SchoolUniformOut)
async def update_uniform(
    id: uuid.UUID, 
    payload: SchoolUniformUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = UniformService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_uniform(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = UniformService(db)
    return await service.delete(id, user_id=current_user.id)

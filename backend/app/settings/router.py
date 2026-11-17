from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.settings.schemas import WebsiteSettingsUpdate, WebsiteSettingsOut
from app.settings.services import SettingsService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=WebsiteSettingsOut)
async def get_settings(db: AsyncSession = Depends(get_db)):
    service = SettingsService(db)
    return await service.get_settings()

@router.put("/", response_model=WebsiteSettingsOut)
async def update_settings(
    payload: WebsiteSettingsUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = SettingsService(db)
    return await service.update_settings(payload, user_id=current_user.id)

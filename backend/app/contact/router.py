import uuid
from fastapi import APIRouter, Depends, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.contact.schemas import ContactMessageCreate, ContactMessageUpdate, ContactMessageOut
from app.contact.services import ContactService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[ContactMessageOut])
async def list_messages(
    search: str = None,
    status: str = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = ContactService(db)
    return await service.get_all(search=search, status_filter=status)

@router.get("/export/csv/")
async def export_messages_csv(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = ContactService(db)
    csv_content = await service.export_csv()
    return StreamingResponse(
        iter([csv_content]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=contact_submissions.csv"}
    )

@router.get("/{id}/", response_model=ContactMessageOut)
async def get_message(
    id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = ContactService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=ContactMessageOut, status_code=status.HTTP_201_CREATED)
async def submit_message(
    payload: ContactMessageCreate,
    db: AsyncSession = Depends(get_db)
):
    service = ContactService(db)
    return await service.create(payload)

@router.put("/{id}/", response_model=ContactMessageOut)
async def update_message(
    id: uuid.UUID,
    payload: ContactMessageUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = ContactService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_message(
    id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = ContactService(db)
    return await service.delete(id, user_id=current_user.id)

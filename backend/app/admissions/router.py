import uuid
from fastapi import APIRouter, Depends, status
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.admissions.schemas import AdmissionQueryCreate, AdmissionQueryUpdate, AdmissionQueryOut
from app.admissions.services import AdmissionService
from app.auth.models import User

router = APIRouter()

@router.get("/", response_model=list[AdmissionQueryOut])
async def list_queries(
    search: str = None, 
    status: str = None, 
    class_applied: str = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AdmissionService(db)
    return await service.get_all(search=search, status_filter=status, class_filter=class_applied)

@router.get("/export/csv/")
async def export_queries_csv(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AdmissionService(db)
    csv_content = await service.export_csv()
    return StreamingResponse(
        iter([csv_content]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=admission_enquiries.csv"}
    )

@router.get("/{id}/", response_model=AdmissionQueryOut)
async def get_query(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AdmissionService(db)
    return await service.get_by_id(id)

@router.post("/", response_model=AdmissionQueryOut, status_code=status.HTTP_201_CREATED)
async def create_query(
    payload: AdmissionQueryCreate, 
    db: AsyncSession = Depends(get_db)
):
    service = AdmissionService(db)
    return await service.create(payload)

@router.put("/{id}/", response_model=AdmissionQueryOut)
async def update_query(
    id: uuid.UUID, 
    payload: AdmissionQueryUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AdmissionService(db)
    return await service.update(id, payload, user_id=current_user.id)

@router.delete("/{id}/")
async def delete_query(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = AdmissionService(db)
    return await service.delete(id, user_id=current_user.id)

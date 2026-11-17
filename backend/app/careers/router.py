import uuid
from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import require_editor_or_above
from app.careers.schemas import (
    VacancyCreate, VacancyUpdate, VacancyOut,
    JobApplicationCreate, JobApplicationUpdate, JobApplicationOut
)
from app.careers.services import CareerService
from app.auth.models import User

vacancy_router = APIRouter()
application_router = APIRouter()

# --- Vacancies Router ---

@vacancy_router.get("/", response_model=list[VacancyOut])
async def list_vacancies(
    department: str = None, 
    status: str = None, 
    db: AsyncSession = Depends(get_db)
):
    service = CareerService(db)
    return await service.get_all_vacancies(department=department, status_filter=status)

@vacancy_router.get("/{id}/", response_model=VacancyOut)
async def get_vacancy(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    service = CareerService(db)
    return await service.get_vacancy_by_id(id)

@vacancy_router.post("/", response_model=VacancyOut, status_code=status.HTTP_201_CREATED)
async def create_vacancy(
    payload: VacancyCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.create_vacancy(payload, user_id=current_user.id)

@vacancy_router.put("/{id}/", response_model=VacancyOut)
async def update_vacancy(
    id: uuid.UUID, 
    payload: VacancyUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.update_vacancy(id, payload, user_id=current_user.id)

@vacancy_router.delete("/{id}/")
async def delete_vacancy(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.delete_vacancy(id, user_id=current_user.id)


# --- Job Applications Router ---

@application_router.get("/", response_model=list[JobApplicationOut])
async def list_applications(
    vacancy_id: uuid.UUID = None, 
    status: str = None, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.get_all_applications(vacancy_id=vacancy_id, status_filter=status)

@application_router.get("/{id}/", response_model=JobApplicationOut)
async def get_application(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.get_application_by_id(id)

@application_router.post("/", response_model=JobApplicationOut, status_code=status.HTTP_201_CREATED)
async def submit_application(
    payload: JobApplicationCreate, 
    db: AsyncSession = Depends(get_db)
):
    service = CareerService(db)
    return await service.create_application(payload)

@application_router.put("/{id}/", response_model=JobApplicationOut)
async def update_application(
    id: uuid.UUID, 
    payload: JobApplicationUpdate, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.update_application(id, payload, user_id=current_user.id)

@application_router.delete("/{id}/")
async def delete_application(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    return await service.delete_application(id, user_id=current_user.id)

@application_router.get("/{id}/download/")
async def download_resume(
    id: uuid.UUID, 
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_editor_or_above)
):
    service = CareerService(db)
    application = await service.get_application_by_id(id)
    if not application.resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Resume not uploaded for this application."
        )
    return RedirectResponse(url=application.resume)

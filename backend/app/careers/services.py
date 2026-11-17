import uuid
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.careers.repository import VacancyRepository, JobApplicationRepository
from app.careers.schemas import VacancyCreate, VacancyUpdate, JobApplicationCreate, JobApplicationUpdate
from app.careers.models import Vacancy, JobApplication

class CareerService:
    def __init__(self, db: AsyncSession):
        self.vacancy_repo = VacancyRepository(db)
        self.app_repo = JobApplicationRepository(db)

    # Vacancy operations
    async def get_all_vacancies(
        self, 
        department: Optional[str] = None, 
        status_filter: Optional[str] = None
    ) -> List[Vacancy]:
        stmt = select(Vacancy).filter(Vacancy.deleted_at.is_(None))
        if department:
            stmt = stmt.filter(Vacancy.department == department)
        if status_filter:
            stmt = stmt.filter(Vacancy.status == status_filter)
        stmt = stmt.order_by(Vacancy.created_at.desc())
        result = await self.vacancy_repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_vacancy_by_id(self, vacancy_id: uuid.UUID) -> Vacancy:
        item = await self.vacancy_repo.get_by_id(vacancy_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vacancy not found"
            )
        return item

    async def create_vacancy(self, payload: VacancyCreate, user_id: uuid.UUID) -> Vacancy:
        return await self.vacancy_repo.create(payload.model_dump(), user_id=user_id)

    async def update_vacancy(self, vacancy_id: uuid.UUID, payload: VacancyUpdate, user_id: uuid.UUID) -> Vacancy:
        item = await self.get_vacancy_by_id(vacancy_id)
        return await self.vacancy_repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete_vacancy(self, vacancy_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_vacancy_by_id(vacancy_id)
        await self.vacancy_repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Vacancy deleted successfully"}

    # JobApplication operations
    async def get_all_applications(
        self,
        vacancy_id: Optional[uuid.UUID] = None,
        status_filter: Optional[str] = None
    ) -> List[JobApplication]:
        stmt = select(JobApplication).filter(JobApplication.deleted_at.is_(None))
        if vacancy_id:
            stmt = stmt.filter(JobApplication.vacancy_id == vacancy_id)
        if status_filter:
            stmt = stmt.filter(JobApplication.status == status_filter)
        stmt = stmt.order_by(JobApplication.created_at.desc())
        result = await self.app_repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_application_by_id(self, application_id: uuid.UUID) -> JobApplication:
        item = await self.app_repo.get_by_id(application_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job application not found"
            )
        return item

    async def create_application(self, payload: JobApplicationCreate) -> JobApplication:
        vacancy = await self.get_vacancy_by_id(payload.vacancy_id)
        if vacancy.status != "Open":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Applications for this vacancy are currently closed."
            )
        return await self.app_repo.create(payload.model_dump())

    async def update_application(self, application_id: uuid.UUID, payload: JobApplicationUpdate, user_id: uuid.UUID) -> JobApplication:
        item = await self.get_application_by_id(application_id)
        return await self.app_repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete_application(self, application_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_application_by_id(application_id)
        await self.app_repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Application deleted successfully"}

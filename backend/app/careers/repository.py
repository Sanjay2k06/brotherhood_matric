from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.careers.models import Vacancy, JobApplication

class VacancyRepository(AsyncBaseRepository[Vacancy]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Vacancy)

class JobApplicationRepository(AsyncBaseRepository[JobApplication]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, JobApplication)

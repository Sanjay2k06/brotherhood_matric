from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.admissions.models import AdmissionQuery

class AdmissionRepository(AsyncBaseRepository[AdmissionQuery]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, AdmissionQuery)

from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.teachers.models import Teacher

class TeacherRepository(AsyncBaseRepository[Teacher]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, Teacher)

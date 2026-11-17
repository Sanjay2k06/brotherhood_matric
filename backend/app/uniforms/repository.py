from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.uniforms.models import SchoolUniform

class UniformRepository(AsyncBaseRepository[SchoolUniform]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, SchoolUniform)

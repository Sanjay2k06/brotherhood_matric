from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.gallery.models import GalleryImage

class GalleryRepository(AsyncBaseRepository[GalleryImage]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, GalleryImage)

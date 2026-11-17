from sqlalchemy.ext.asyncio import AsyncSession
from app.shared.repository import AsyncBaseRepository
from app.contact.models import ContactMessage

class ContactRepository(AsyncBaseRepository[ContactMessage]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, ContactMessage)

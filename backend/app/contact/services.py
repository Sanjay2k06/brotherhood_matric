import uuid
import io
import csv
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from app.contact.repository import ContactRepository
from app.contact.schemas import ContactMessageCreate, ContactMessageUpdate
from app.contact.models import ContactMessage

class ContactService:
    def __init__(self, db: AsyncSession):
        self.repo = ContactRepository(db)

    async def get_all(
        self,
        search: Optional[str] = None,
        status_filter: Optional[str] = None
    ) -> List[ContactMessage]:
        stmt = select(ContactMessage).filter(ContactMessage.deleted_at.is_(None))

        if search:
            search_pattern = f"%{search}%"
            stmt = stmt.filter(
                or_(
                    ContactMessage.name.ilike(search_pattern),
                    ContactMessage.email.ilike(search_pattern),
                    ContactMessage.phone.ilike(search_pattern),
                    ContactMessage.subject.ilike(search_pattern),
                    ContactMessage.message.ilike(search_pattern)
                )
            )

        if status_filter:
            stmt = stmt.filter(ContactMessage.status == status_filter)

        stmt = stmt.order_by(ContactMessage.created_at.desc())
        result = await self.repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(self, message_id: uuid.UUID) -> ContactMessage:
        item = await self.repo.get_by_id(message_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Contact message not found"
            )
        return item

    async def create(self, payload: ContactMessageCreate) -> ContactMessage:
        return await self.repo.create(payload.model_dump())

    async def update(self, message_id: uuid.UUID, payload: ContactMessageUpdate, user_id: uuid.UUID) -> ContactMessage:
        item = await self.get_by_id(message_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, message_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(message_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Contact message deleted successfully"}

    async def export_csv(self) -> str:
        stmt = select(ContactMessage).filter(ContactMessage.deleted_at.is_(None)).order_by(ContactMessage.created_at.desc())
        result = await self.repo.db.execute(stmt)
        records = result.scalars().all()

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["ID", "Name", "Email", "Phone", "Subject", "Message", "Status", "Created At"])
        for r in records:
            writer.writerow([
                str(r.id), r.name, r.email or "", r.phone, r.subject or "",
                r.message, r.status, r.created_at.isoformat()
            ])
        return output.getvalue()

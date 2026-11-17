import uuid
import io
import csv
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from app.admissions.repository import AdmissionRepository
from app.admissions.schemas import AdmissionQueryCreate, AdmissionQueryUpdate
from app.admissions.models import AdmissionQuery

class AdmissionService:
    def __init__(self, db: AsyncSession):
        self.repo = AdmissionRepository(db)

    async def get_all(
        self,
        search: Optional[str] = None,
        status_filter: Optional[str] = None,
        class_filter: Optional[str] = None
    ) -> List[AdmissionQuery]:
        stmt = select(AdmissionQuery).filter(AdmissionQuery.deleted_at.is_(None))

        if search:
            search_pattern = f"%{search}%"
            stmt = stmt.filter(
                or_(
                    AdmissionQuery.student_name.ilike(search_pattern),
                    AdmissionQuery.parent_name.ilike(search_pattern),
                    AdmissionQuery.email.ilike(search_pattern),
                    AdmissionQuery.phone.ilike(search_pattern),
                    AdmissionQuery.message.ilike(search_pattern)
                )
            )

        if status_filter:
            stmt = stmt.filter(AdmissionQuery.status == status_filter)
        if class_filter:
            stmt = stmt.filter(AdmissionQuery.class_applied == class_filter)

        stmt = stmt.order_by(AdmissionQuery.created_at.desc())
        result = await self.repo.db.execute(stmt)
        return list(result.scalars().all())

    async def get_by_id(self, query_id: uuid.UUID) -> AdmissionQuery:
        item = await self.repo.get_by_id(query_id)
        if not item:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Admission enquiry not found"
            )
        return item

    async def create(self, payload: AdmissionQueryCreate) -> AdmissionQuery:
        # Public submissions do not require authorization
        return await self.repo.create(payload.model_dump())

    async def update(self, query_id: uuid.UUID, payload: AdmissionQueryUpdate, user_id: uuid.UUID) -> AdmissionQuery:
        item = await self.get_by_id(query_id)
        return await self.repo.update(item, payload.model_dump(exclude_unset=True), user_id=user_id)

    async def delete(self, query_id: uuid.UUID, user_id: uuid.UUID):
        item = await self.get_by_id(query_id)
        await self.repo.soft_delete(item, user_id=user_id)
        return {"success": True, "message": "Enquiry deleted successfully"}

    async def export_csv(self) -> str:
        stmt = select(AdmissionQuery).filter(AdmissionQuery.deleted_at.is_(None)).order_by(AdmissionQuery.created_at.desc())
        result = await self.repo.db.execute(stmt)
        records = result.scalars().all()

        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow(["ID", "Student Name", "Parent Name", "Phone", "Email", "Class Applied", "Message", "Status", "Notes", "Created At"])
        for r in records:
            writer.writerow([
                str(r.id), r.student_name, r.parent_name, r.phone, r.email or "",
                r.class_applied, r.message or "", r.status, r.notes or "", r.created_at.isoformat()
            ])
        return output.getvalue()

from sqlalchemy import Column, String, DateTime
from app.database.base import BaseAuditModel

class Announcement(BaseAuditModel):
    __tablename__ = "announcements"

    title = Column(String, nullable=False)
    message = Column(String, nullable=False)
    priority = Column(String, nullable=False, default="Medium")       # Low, Medium, High
    status = Column(String, nullable=False, default="Active")         # Active, Inactive
    alert_type = Column(String, nullable=False, default="Notice")     # Admission, Event, Notice, Emergency
    expiry_date = Column(DateTime(timezone=True), nullable=True)

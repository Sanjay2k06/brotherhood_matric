from sqlalchemy import Column, String, Boolean
from app.database.base import BaseAuditModel

class Event(BaseAuditModel):
    __tablename__ = "events"

    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    cover_image = Column(String, nullable=True)
    event_date = Column(String, nullable=False)          # "YYYY-MM-DD"
    event_time = Column(String, nullable=True)          # e.g., "10:00 AM"
    venue = Column(String, nullable=True)
    category = Column(String, nullable=False, default="Academic")  # Academic, Celebration, Athletics, etc.
    status = Column(String, nullable=False, default="Published")    # Published, Draft
    is_featured = Column(Boolean, default=False, nullable=False)
    is_upcoming = Column(Boolean, default=True, nullable=False)
    registration_link = Column(String, nullable=True)

from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class ContactMessage(BaseAuditModel):
    __tablename__ = "contact_messages"

    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=False)
    subject = Column(String, nullable=True)
    message = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Pending")  # Pending, Replied, Closed

from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class AdmissionQuery(BaseAuditModel):
    __tablename__ = "admission_queries"

    student_name = Column(String, nullable=False)
    parent_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    class_applied = Column(String, nullable=False, default="Class I")
    message = Column(String, nullable=True)
    status = Column(String, nullable=False, default="New")  # New, Contacted, Application Sent, Closed
    notes = Column(String, nullable=True)

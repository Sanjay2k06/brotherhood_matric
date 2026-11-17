from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class Teacher(BaseAuditModel):
    __tablename__ = "teachers"

    name = Column(String, nullable=False)
    designation = Column(String, nullable=False)
    subject = Column(String, nullable=False, default="General")
    qualification = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)

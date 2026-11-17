from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class StudentAchievement(BaseAuditModel):
    __tablename__ = "student_achievements"

    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)

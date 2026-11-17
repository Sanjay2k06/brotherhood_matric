from sqlalchemy import Column, String, Integer
from app.database.base import BaseAuditModel

class StudentHouse(BaseAuditModel):
    __tablename__ = "student_houses"

    name = Column(String, nullable=False)
    motto = Column(String, nullable=True)
    color_code = Column(String, nullable=True, default="bg-red-500")
    description = Column(String, nullable=True)
    points = Column(Integer, nullable=False, default=0)

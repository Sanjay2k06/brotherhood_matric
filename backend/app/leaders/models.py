from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class StudentLeader(BaseAuditModel):
    __tablename__ = "student_leaders"

    role = Column(String, nullable=False)   # Head Boy, Head Girl, etc.
    name = Column(String, nullable=False)
    grade = Column(String, nullable=False)  # Class XII, Std V, etc.
    wing = Column(String, nullable=True, default="Primary")  # Primary or Secondary
    house = Column(String, nullable=True)   # Galilee House, St. Matthew House, etc.
    duties = Column(String, nullable=True)  # Detailed responsibilities

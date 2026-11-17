from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class SchoolUniform(BaseAuditModel):
    __tablename__ = "school_uniforms"

    section = Column(String, nullable=False)  # Primary, Middle, etc.
    boys_uniform = Column(String, nullable=False)
    girls_uniform = Column(String, nullable=False)

from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import UUID
from app.database.base import BaseAuditModel

class Vacancy(BaseAuditModel):
    __tablename__ = "vacancies"

    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    qualification = Column(String, nullable=True)
    experience = Column(String, nullable=True)
    department = Column(String, nullable=False)
    deadline = Column(String, nullable=True)             # Deadline date "YYYY-MM-DD"
    status = Column(String, nullable=False, default="Open")  # Open, Closed, Draft

    applications = relationship("JobApplication", back_populates="vacancy_rel", cascade="all, delete-orphan")

class JobApplication(BaseAuditModel):
    __tablename__ = "job_applications"

    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    vacancy_id = Column(UUID(as_uuid=True), ForeignKey("vacancies.id", ondelete="CASCADE"), nullable=False)
    cover_letter = Column(String, nullable=True)
    resume = Column(String, nullable=True)               # Resume upload URL
    status = Column(String, nullable=False, default="New") # New, Shortlisted, Interview, Rejected, Selected

    vacancy_rel = relationship("Vacancy", back_populates="applications")

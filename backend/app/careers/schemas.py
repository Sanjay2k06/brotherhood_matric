import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

# Vacancy Schemas
class VacancyBase(BaseModel):
    title: str
    description: str
    qualification: Optional[str] = None
    experience: Optional[str] = None
    department: str
    deadline: Optional[str] = None
    status: str = "Open"

class VacancyCreate(VacancyBase):
    pass

class VacancyUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    qualification: Optional[str] = None
    experience: Optional[str] = None
    department: Optional[str] = None
    deadline: Optional[str] = None
    status: Optional[str] = None

class VacancyOut(VacancyBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

# Job Application Schemas
class JobApplicationBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    vacancy_id: uuid.UUID
    cover_letter: Optional[str] = None
    resume: Optional[str] = None  # URL to uploaded file
    status: str = "New"

class JobApplicationCreate(JobApplicationBase):
    pass

class JobApplicationUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    vacancy_id: Optional[uuid.UUID] = None
    cover_letter: Optional[str] = None
    resume: Optional[str] = None
    status: Optional[str] = None

class JobApplicationOut(JobApplicationBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

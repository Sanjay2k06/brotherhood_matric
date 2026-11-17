import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class TeacherBase(BaseModel):
    name: str
    designation: str
    subject: str = "General"
    qualification: Optional[str] = None
    experience: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None

class TeacherCreate(TeacherBase):
    pass

class TeacherUpdate(BaseModel):
    name: Optional[str] = None
    designation: Optional[str] = None
    subject: Optional[str] = None
    qualification: Optional[str] = None
    experience: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None

class TeacherOut(TeacherBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

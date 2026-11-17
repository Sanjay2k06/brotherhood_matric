import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class AdmissionQueryBase(BaseModel):
    student_name: str
    parent_name: str
    phone: str
    email: Optional[EmailStr] = None
    class_applied: str = "Class I"
    message: Optional[str] = None
    status: str = "New"
    notes: Optional[str] = None

class AdmissionQueryCreate(AdmissionQueryBase):
    pass

class AdmissionQueryUpdate(BaseModel):
    student_name: Optional[str] = None
    parent_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    class_applied: Optional[str] = None
    message: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class AdmissionQueryOut(AdmissionQueryBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

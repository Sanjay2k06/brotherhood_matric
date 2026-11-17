import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class ContactMessageBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: str
    subject: Optional[str] = None
    message: str
    status: str = "Pending"

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: Optional[str] = None
    status: Optional[str] = None

class ContactMessageOut(ContactMessageBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

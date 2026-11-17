import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class AnnouncementBase(BaseModel):
    title: str
    message: str
    priority: str = "Medium"
    status: str = "Active"
    alert_type: str = "Notice"
    expiry_date: Optional[datetime] = None

class AnnouncementCreate(AnnouncementBase):
    pass

class AnnouncementUpdate(BaseModel):
    title: Optional[str] = None
    message: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    alert_type: Optional[str] = None
    expiry_date: Optional[datetime] = None

class AnnouncementOut(AnnouncementBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

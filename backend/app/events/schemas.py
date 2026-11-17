import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: str
    cover_image: Optional[str] = None
    event_date: str
    event_time: Optional[str] = None
    venue: Optional[str] = None
    category: str = "Academic"
    status: str = "Published"
    is_featured: bool = False
    is_upcoming: bool = True
    registration_link: Optional[str] = None

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    cover_image: Optional[str] = None
    event_date: Optional[str] = None
    event_time: Optional[str] = None
    venue: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    is_upcoming: Optional[bool] = None
    registration_link: Optional[str] = None

class EventOut(EventBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

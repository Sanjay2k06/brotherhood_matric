import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class StudentAchievementBase(BaseModel):
    title: str
    description: Optional[str] = None
    image: Optional[str] = None

class StudentAchievementCreate(StudentAchievementBase):
    pass

class StudentAchievementUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None

class StudentAchievementOut(StudentAchievementBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

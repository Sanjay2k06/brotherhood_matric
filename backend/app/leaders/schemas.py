import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class StudentLeaderBase(BaseModel):
    role: str
    name: str
    grade: str

class StudentLeaderCreate(StudentLeaderBase):
    pass

class StudentLeaderUpdate(BaseModel):
    role: Optional[str] = None
    name: Optional[str] = None
    grade: Optional[str] = None

class StudentLeaderOut(StudentLeaderBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

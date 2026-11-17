import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class StudentHouseBase(BaseModel):
    name: str
    motto: Optional[str] = None
    color_code: Optional[str] = "bg-red-500"
    description: Optional[str] = None
    points: int = 0

class StudentHouseCreate(StudentHouseBase):
    pass

class StudentHouseUpdate(BaseModel):
    name: Optional[str] = None
    motto: Optional[str] = None
    color_code: Optional[str] = None
    description: Optional[str] = None
    points: Optional[int] = None

class StudentHouseOut(StudentHouseBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class SchoolUniformBase(BaseModel):
    section: str
    boys_uniform: str
    girls_uniform: str

class SchoolUniformCreate(SchoolUniformBase):
    pass

class SchoolUniformUpdate(BaseModel):
    section: Optional[str] = None
    boys_uniform: Optional[str] = None
    girls_uniform: Optional[str] = None

class SchoolUniformOut(SchoolUniformBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

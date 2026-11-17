import uuid
from typing import Optional, List
from pydantic import BaseModel, field_validator
from datetime import datetime

VALID_CATEGORIES = ["Campus", "Sports", "Events", "Academics", "Cultural", "Infrastructure"]

class GalleryImageBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: str = "Events"
    image: str
    sort_order: int = 0
    is_featured: bool = False

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: str) -> str:
        if v not in VALID_CATEGORIES:
            raise ValueError(f"Category must be one of {VALID_CATEGORIES}")
        return v

class GalleryImageCreate(GalleryImageBase):
    pass

class GalleryImageUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    sort_order: Optional[int] = None
    is_featured: Optional[bool] = None

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: Optional[str]) -> Optional[str]:
        if v is not None and v not in VALID_CATEGORIES:
            raise ValueError(f"Category must be one of {VALID_CATEGORIES}")
        return v

class GalleryImageOut(GalleryImageBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

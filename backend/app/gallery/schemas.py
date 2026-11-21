import uuid
from typing import Optional, List, Union
from pydantic import BaseModel, field_validator
from datetime import datetime

class GalleryImageBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: str = "General"
    image: str
    sort_order: int = 0
    is_featured: bool = False

    @field_validator("category")
    @classmethod
    def validate_category(cls, v: str) -> str:
        if not v or not v.strip():
            return "General"
        return v.strip()

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
        if v is not None and not v.strip():
            return "General"
        return v.strip() if v else v

class GalleryImageOut(GalleryImageBase):
    id: Union[uuid.UUID, str]
    created_at: Optional[Union[datetime, str]] = None
    updated_at: Optional[Union[datetime, str]] = None
    created_by: Optional[Union[uuid.UUID, str]] = None
    updated_by: Optional[Union[uuid.UUID, str]] = None
    is_active: bool = True

    class Config:
        from_attributes = True

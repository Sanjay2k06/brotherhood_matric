import uuid
from typing import Optional, Any
from pydantic import BaseModel
from datetime import datetime

class PageBase(BaseModel):
    title: str
    slug: str
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    banner_image: Optional[str] = None
    content_blocks: Optional[Any] = None
    images: Optional[Any] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    status: str = "Published"

class PageCreate(PageBase):
    pass

class PageUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    banner_image: Optional[str] = None
    content_blocks: Optional[Any] = None
    images: Optional[Any] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    status: Optional[str] = None

class PageOut(PageBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

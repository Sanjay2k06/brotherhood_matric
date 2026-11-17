import uuid
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class WebsiteSettingsBase(BaseModel):
    school_name: str = "Brotherhood School"
    tagline: Optional[str] = None
    logo: Optional[str] = None
    favicon: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    alternate_phone: Optional[str] = None
    whatsapp: Optional[str] = None
    address: Optional[str] = None
    google_maps_embed: Optional[str] = None
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    youtube: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    working_hours: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    google_analytics_id: Optional[str] = None
    meta_pixel: Optional[str] = None
    footer_text: Optional[str] = None
    copyright: Optional[str] = None
    theme_color: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None

class WebsiteSettingsCreate(WebsiteSettingsBase):
    pass

class WebsiteSettingsUpdate(BaseModel):
    school_name: Optional[str] = None
    tagline: Optional[str] = None
    logo: Optional[str] = None
    favicon: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    alternate_phone: Optional[str] = None
    whatsapp: Optional[str] = None
    address: Optional[str] = None
    google_maps_embed: Optional[str] = None
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    youtube: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    working_hours: Optional[str] = None
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None
    seo_keywords: Optional[str] = None
    google_analytics_id: Optional[str] = None
    meta_pixel: Optional[str] = None
    footer_text: Optional[str] = None
    copyright: Optional[str] = None
    theme_color: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None

class WebsiteSettingsOut(WebsiteSettingsBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[uuid.UUID] = None
    updated_by: Optional[uuid.UUID] = None
    is_active: bool

    class Config:
        from_attributes = True

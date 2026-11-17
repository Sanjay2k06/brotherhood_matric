from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class WebsiteSettings(BaseAuditModel):
    __tablename__ = "website_settings"

    school_name = Column(String, nullable=False, default="Brotherhood School")
    tagline = Column(String, nullable=True)
    logo = Column(String, nullable=True)
    favicon = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    alternate_phone = Column(String, nullable=True)
    whatsapp = Column(String, nullable=True)
    address = Column(String, nullable=True)
    google_maps_embed = Column(String, nullable=True)
    facebook = Column(String, nullable=True)
    instagram = Column(String, nullable=True)
    youtube = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    twitter = Column(String, nullable=True)
    working_hours = Column(String, nullable=True)
    seo_title = Column(String, nullable=True)
    seo_description = Column(String, nullable=True)
    seo_keywords = Column(String, nullable=True)
    google_analytics_id = Column(String, nullable=True)
    meta_pixel = Column(String, nullable=True)
    footer_text = Column(String, nullable=True)
    copyright = Column(String, nullable=True)
    theme_color = Column(String, nullable=True)
    primary_color = Column(String, nullable=True)
    secondary_color = Column(String, nullable=True)

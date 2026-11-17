from sqlalchemy import Column, String, JSON
from app.database.base import BaseAuditModel

class Page(BaseAuditModel):
    __tablename__ = "pages"

    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    hero_title = Column(String, nullable=True)
    hero_subtitle = Column(String, nullable=True)
    banner_image = Column(String, nullable=True)
    content_blocks = Column(JSON, nullable=True)  # List/Dict of rich text content blocks
    images = Column(JSON, nullable=True)          # List of images
    seo_title = Column(String, nullable=True)
    seo_description = Column(String, nullable=True)
    seo_keywords = Column(String, nullable=True)
    status = Column(String, nullable=False, default="Published")  # Published, Draft

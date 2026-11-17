from sqlalchemy import Column, String, Integer, Boolean
from app.database.base import BaseAuditModel

class GalleryImage(BaseAuditModel):
    __tablename__ = "gallery_images"

    title = Column(String, nullable=True)
    description = Column(String, nullable=True)
    category = Column(String, nullable=False, default="Events")  # Campus, Sports, Events, Academics, Cultural, Infrastructure
    image = Column(String, nullable=False)                        # Image URL
    sort_order = Column(Integer, nullable=False, default=0)
    is_featured = Column(Boolean, default=False, nullable=False)

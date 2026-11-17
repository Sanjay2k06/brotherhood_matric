from sqlalchemy import Column, String
from app.database.base import BaseAuditModel

class User(BaseAuditModel):
    __tablename__ = "users"

    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, nullable=False, default="Editor")  # "Super Admin", "Editor"
    refresh_token = Column(String, nullable=True)

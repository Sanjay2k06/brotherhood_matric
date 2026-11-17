import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, declared_attr
from sqlalchemy.types import UUID
from sqlalchemy.sql import func

Base = declarative_base()

class BaseAuditModel(Base):
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    @declared_attr
    def created_by(cls):
        return Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    @declared_attr
    def updated_by(cls):
        return Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    def soft_delete(self):
        self.deleted_at = func.now()
        self.is_active = False



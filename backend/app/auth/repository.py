import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.models import User
from app.core import security

class AuthRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: uuid.UUID) -> Optional[User]:
        stmt = select(User).filter(User.id == user_id, User.deleted_at.is_(None))
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_username(self, username: str) -> Optional[User]:
        stmt = select(User).filter(User.username == username, User.deleted_at.is_(None))
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        stmt = select(User).filter(User.email == email, User.deleted_at.is_(None))
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def create(self, username: str, email: str, password_raw: str, role: str) -> User:
        hashed = security.get_password_hash(password_raw)
        db_user = User(
            username=username,
            email=email,
            hashed_password=hashed,
            role=role
        )
        self.db.add(db_user)
        await self.db.commit()
        await self.db.refresh(db_user)
        return db_user

    async def update_password(self, user: User, new_password_raw: str) -> User:
        user.hashed_password = security.get_password_hash(new_password_raw)
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def update_refresh_token(self, user: User, refresh_token: Optional[str]) -> User:
        user.refresh_token = refresh_token
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

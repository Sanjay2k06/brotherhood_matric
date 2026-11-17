from typing import List
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database.connection import get_db
from app.core import security
from app.core.logging import logger

security_scheme = HTTPBearer(auto_error=False)

def get_token(authorization: HTTPAuthorizationCredentials = Depends(security_scheme)) -> str:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authorization token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return authorization.credentials

async def get_current_user(
    token: str = Depends(get_token),
    db: AsyncSession = Depends(get_db)
):
    from app.auth.models import User
    
    username = security.decode_token(token)
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    stmt = select(User).filter(User.username == username, User.deleted_at.is_(None))
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user

class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user = Depends(get_current_user)):
        if current_user.role not in self.allowed_roles:
            logger.warning(f"Unauthorized role access attempt by user {current_user.username}. Required: {self.allowed_roles}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Unauthorized: Insufficient roles to access this resource",
            )
        return current_user

# Pre-configured role checks
require_super_admin = RoleChecker(["Super Admin"])
require_editor_or_above = RoleChecker(["Super Admin", "Editor"])

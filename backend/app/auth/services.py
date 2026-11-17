from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.repository import AuthRepository
from app.auth.schemas import LoginRequest, TokenResponse, PasswordChangeRequest, RefreshTokenRequest, ForgotPasswordRequest
from app.core import security
from app.core.logging import logger

class AuthService:
    def __init__(self, db: AsyncSession):
        self.repo = AuthRepository(db)

    async def authenticate_user(self, payload: LoginRequest) -> TokenResponse:
        user = await self.repo.get_by_username(payload.username)
        if not user or not security.verify_password(payload.password, user.hashed_password):
            logger.warning(f"Failed login attempt for username: {payload.username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )
            
        logger.info(f"User {payload.username} authenticated successfully.")
        
        # Access and refresh tokens
        access_token = security.create_access_token(subject=user.username)
        refresh_token = security.create_access_token(subject=user.username)
        
        # Save refresh token in database
        await self.repo.update_refresh_token(user, refresh_token)
        
        return TokenResponse(
            access=access_token,
            refresh=refresh_token
        )

    async def refresh_tokens(self, payload: RefreshTokenRequest) -> TokenResponse:
        username = security.decode_token(payload.refresh)
        if not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired refresh token"
            )
        
        user = await self.repo.get_by_username(username)
        if not user or user.refresh_token != payload.refresh:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Refresh token has been revoked or is invalid"
            )
            
        # Issue new access and refresh tokens
        new_access = security.create_access_token(subject=user.username)
        new_refresh = security.create_access_token(subject=user.username)
        
        await self.repo.update_refresh_token(user, new_refresh)
        
        return TokenResponse(
            access=new_access,
            refresh=new_refresh
        )

    async def change_password(self, username: str, payload: PasswordChangeRequest):
        user = await self.repo.get_by_username(username)
        if not user or not security.verify_password(payload.current_password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Incorrect current password"
            )
            
        await self.repo.update_password(user, payload.new_password)
        logger.info(f"Password updated successfully for user {username}.")
        return {"success": True, "message": "Password changed successfully"}

    async def forgot_password(self, payload: ForgotPasswordRequest):
        # Forgot password is architecture ready (stub email delivery logic)
        user = await self.repo.get_by_email(payload.email)
        if user:
            logger.info(f"Password reset requested for email {payload.email}. Architecture is ready for email service integration.")
        
        return {
            "success": True,
            "message": "If the email is registered in our system, password reset instructions have been sent."
        }

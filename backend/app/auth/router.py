from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.core.dependencies import get_current_user
from app.auth.schemas import (
    LoginRequest, 
    TokenResponse, 
    UserProfile, 
    PasswordChangeRequest, 
    RefreshTokenRequest,
    ForgotPasswordRequest
)
from app.auth.services import AuthService
from app.auth.models import User

router = APIRouter()

@router.post("/token/", response_model=TokenResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.authenticate_user(payload)

@router.post("/refresh/", response_model=TokenResponse)
async def refresh(payload: RefreshTokenRequest, db: AsyncSession = Depends(get_db)):
    service = AuthService(db)
    return await service.refresh_tokens(payload)

@router.get("/profile/", response_model=UserProfile)
async def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/change-password/")
async def change_password(
    payload: PasswordChangeRequest, 
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    service = AuthService(db)
    return await service.change_password(current_user.username, payload)

@router.post("/forgot-password/")
async def forgot_password(
    payload: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db)
):
    service = AuthService(db)
    return await service.forgot_password(payload)

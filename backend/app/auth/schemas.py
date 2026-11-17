import uuid
from typing import Optional
from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access: str
    refresh: str

class UserProfile(BaseModel):
    id: uuid.UUID
    username: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

class RefreshTokenRequest(BaseModel):
    refresh: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

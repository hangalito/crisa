from fastapi import APIRouter, HTTPException, Response, Depends, status
from models.schemas import OTPRequest, OTPVerify, Message
from services.otp import create_otp, verify_and_consume_otp, can_resend_otp
from services.email import send_otp_email
from core.config import settings
from core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/request-otp", response_model=Message)
async def request_otp(payload: OTPRequest):
    """Step 1: Validate email and send OTP."""
    if payload.email not in settings.AUTHORIZED_EMAILS:
        # Security: Do not reveal if email is authorized or not to prevent enumeration
        # However, as per user requirement, we should lead the frontend to un-authorized page.
        # So we return generic message but maybe a specific flag or status code if we want the frontend to redirect.
        # The prompt says: "If not in list, return response that leads frontend to access denied page"
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied."
        )
    
    if not can_resend_otp(payload.email):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please wait before requesting another code."
        )
    
    otp = create_otp(payload.email)
    try:
        await send_otp_email(payload.email, otp)
    except Exception as e:
        # Log this in a real app
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send email."
        )
        
    return {"message": "OTP sent successfully."}

@router.post("/verify-otp")
async def verify_otp(payload: OTPVerify, response: Response):
    """Step 3: Verify OTP and set JWT cookie."""
    if payload.email not in settings.AUTHORIZED_EMAILS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied.")
    
    if verify_and_consume_otp(payload.email, payload.code):
        token = create_access_token(data={"sub": payload.email})
        
        # Set HttpOnly cookie
        response.set_cookie(
            key="session_token",
            value=token,
            httponly=True,
            secure=True, # Should be True in production
            samesite="strict",
            max_age=settings.ACCESS_TOKEN_EXPIRE_HOURS * 3600
        )
        return {"message": "Login successful."}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired code."
    )

@router.post("/resend-otp", response_model=Message)
async def resend_otp(payload: OTPRequest):
    """Helper to resend OTP if cooldown passed."""
    return await request_otp(payload)

@router.post("/logout", response_model=Message)
async def logout(response: Response):
    """Step 4: Clear session cookie."""
    response.delete_cookie(key="session_token")
    return {"message": "Logged out successfully."}

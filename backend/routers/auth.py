from fastapi import APIRouter, HTTPException, Response, Depends, status, Request
from typing import Optional
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
            detail="Acesso negado."
        )
    
    if not can_resend_otp(payload.email):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Muitos pedidos. Por favor, aguarda antes de pedir um novo código."
        )
    
    otp = create_otp(payload.email)
    try:
        await send_otp_email(payload.email, otp)
    except Exception as e:
        # Log this in a real app
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Falha ao enviar o e-mail."
        )
        
    return {"message": "Código enviado com sucesso."}

@router.post("/verify-otp")
async def verify_otp(payload: OTPVerify, response: Response):
    """Step 3: Verify OTP and set JWT cookie."""
    if payload.email not in settings.AUTHORIZED_EMAILS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acesso negado.")
    
    if verify_and_consume_otp(payload.email, payload.code):
        token = create_access_token(data={"sub": payload.email})
        
        # Set session cookie using centralized config
        response.set_cookie(
            key="session_token",
            value=token,
            **settings.COOKIE_PARAMS
        )
        return {"message": "Login realizado com sucesso."}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Código inválido ou expirado."
    )

@router.get("/me")
async def get_me(request: Request):
    """Get currently logged in user info."""
    from routers.chat import get_current_user
    email = await get_current_user(request)
    return {"email": email}

@router.post("/resend-otp", response_model=Message)
async def resend_otp(payload: OTPRequest):
    """Helper to resend OTP if cooldown passed."""
    return await request_otp(payload)

@router.post("/logout", response_model=Message)
async def logout(response: Response):
    """Step 4: Clear session cookie."""
    cookie_params = settings.COOKIE_PARAMS.copy()
    cookie_params["max_age"] = 0
    
    response.set_cookie(
        key="session_token",
        value="",
        **cookie_params
    )
    return {"message": "Sessão encerrada com sucesso."}

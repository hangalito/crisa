from email.mime.text import MIMEText
import aiosmtplib
from core.config import settings

async def send_otp_email(email: str, otp: str):
    """Send OTP code via SMTP."""
    message = MIMEText(f"O teu código de acesso Crisa é: {otp}\n\nEste código expira em 10 minutos.")
    message["Subject"] = "Código de Acesso Crisa"
    message["From"] = settings.SMTP_USER
    message["To"] = email
    
    await aiosmtplib.send(
        message,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASS,
        start_tls=True if settings.SMTP_PORT == 587 else False,
        use_tls=True if settings.SMTP_PORT == 465 else False,
    )

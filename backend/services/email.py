from email.mime.text import MIMEText
import aiosmtplib
from core.config import settings

async def send_otp_email(email: str, otp: str):
    """Send OTP code via SMTP."""
    message = MIMEText(f"Your Crisa access code is: {otp}\n\nThis code expires in 10 minutes.")
    message["Subject"] = "Crisa Access Code"
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

import secrets
import time
from typing import Dict, Optional
from dataclasses import dataclass
from core.security import hash_otp

@dataclass
class OTPData:
    hashed_otp: str
    expires_at: float
    attempts: int = 0
    last_sent_at: float = 0.0

# In-memory storage for OTPs (for personal use, this is sufficient)
# In a distributed env, use Redis.
otp_store: Dict[str, OTPData] = {}

OTP_EXPIRY_SECONDS = 600  # 10 minutes
MAX_ATTEMPTS = 3
RESEND_COOLDOWN_SECONDS = 60

def generate_otp() -> str:
    """Generate a secure 6-digit OTP."""
    return "".join(secrets.choice("0123456789") for _ in range(6))

def create_otp(email: str) -> str:
    """Create and store a hashed OTP for an email."""
    otp = generate_otp()
    otp_store[email] = OTPData(
        hashed_otp=hash_otp(otp),
        expires_at=time.time() + OTP_EXPIRY_SECONDS,
        last_sent_at=time.time()
    )
    return otp

def can_resend_otp(email: str) -> bool:
    """Check if enough time has passed to resend OTP."""
    if email not in otp_store:
        return True
    return (time.time() - otp_store[email].last_sent_at) >= RESEND_COOLDOWN_SECONDS

def verify_and_consume_otp(email: str, plain_otp: str) -> bool:
    """Verify OTP and remove if successful or max attempts reached."""
    if email not in otp_store:
        return False
    
    data = otp_store[email]
    
    if time.time() > data.expires_at:
        del otp_store[email]
        return False
    
    if hash_otp(plain_otp) == data.hashed_otp:
        del otp_store[email]
        return True
    
    data.attempts += 1
    if data.attempts >= MAX_ATTEMPTS:
        del otp_store[email]
        
    return False

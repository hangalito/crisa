from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Crisa Private Backend"
    
    # Security
    JWT_SECRET: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS: int = 12
    
    # SMTP Configuration
    SMTP_HOST: str
    SMTP_PORT: int
    SMTP_USER: str
    SMTP_PASS: str
    
    # Access Control
    ALLOWED_EMAIL_1: str
    ALLOWED_EMAIL_2: str
    
    @property
    def AUTHORIZED_EMAILS(self) -> List[str]:
        return [self.ALLOWED_EMAIL_1, self.ALLOWED_EMAIL_2]
    
    # Ollama
    OLLAMA_API_URL: str
    
    # Frontend/CORS
    ENVIRONMENT: str = "development"
    ALLOWED_ORIGINS: str
    
    # Cookie Settings
    COOKIE_SAMESITE: str = "lax"
    COOKIE_SECURE: Optional[bool] = None
    COOKIE_HTTPONLY: bool = True
    COOKIE_PATH: str = "/"

    @property
    def COOKIE_PARAMS(self) -> dict:
        is_production = self.ENVIRONMENT == "production"
        secure = self.COOKIE_SECURE if self.COOKIE_SECURE is not None else is_production
        return {
            "httponly": self.COOKIE_HTTPONLY,
            "secure": secure,
            "samesite": self.COOKIE_SAMESITE,
            "path": self.COOKIE_PATH,
            "max_age": self.ACCESS_TOKEN_EXPIRE_HOURS * 3600
        }

    @property
    def AUTHORIZED_ORIGINS(self) -> List[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

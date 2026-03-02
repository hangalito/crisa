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
    FRONTEND_URL: str = "http://localhost:3000"
    PRODUCTION_FRONTEND_URL: Optional[str] = None
    
    @property
    def AUTHORIZED_ORIGINS(self) -> List[str]:
        origins = [self.FRONTEND_URL]
        if self.PRODUCTION_FRONTEND_URL:
            origins.append(self.PRODUCTION_FRONTEND_URL)
        return origins
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

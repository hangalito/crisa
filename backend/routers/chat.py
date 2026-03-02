from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import StreamingResponse
import httpx
from core.security import decode_access_token
from core.config import settings

router = APIRouter(prefix="/api", tags=["chat"])

async def get_current_user(request: Request):
    """Dependency to validate session cookie."""
    token = request.cookies.get("session_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid"
        )
    
    if payload["sub"] not in settings.AUTHORIZED_EMAILS:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized email"
        )
        
    return payload["sub"]

@router.post("/chat")
async def chat_proxy(
    request: Request,
    user_email: str = Depends(get_current_user)
):
    """
    Secure proxy for Ollama /api/chat.
    Forwards request body to local Ollama and streams response back.
    """
    body = await request.json()
    
    # We enforce model 'crisa' as per requirement
    body["model"] = "crisa"
    
    # Filter out sensitive fields if any were passed from frontend (though they shouldn't be)
    # body.pop("options", None) # Optional: could restrict options here
    
    client = httpx.AsyncClient(timeout=60.0)
    
    async def stream_generator():
        try:
            async with client.stream(
                "POST",
                f"{settings.OLLAMA_API_URL}/api/chat",
                json=body,
                headers={"Content-Type": "application/json"}
            ) as response:
                if response.status_code != 200:
                    yield b'{"error": "Backend communication failed"}'
                    return
                
                async for chunk in response.aiter_bytes():
                    yield chunk
        finally:
            await client.aclose()

    return StreamingResponse(stream_generator(), media_type="application/x-ndjson")

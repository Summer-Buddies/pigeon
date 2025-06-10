from fastapi import FastAPI, Request, Depends, HTTPException, status
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from dotenv import load_dotenv
from app.api.routes import router as api_router
from app.socket.manager import ws_router
import os

app = FastAPI()

load_dotenv()  # take environment variables from .env.

FIREBASE_PRIVATE_KEY = os.getenv("FIREBASE_PRIVATE_KEY")

app.include_router(api_router)
app.include_router(ws_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Dependency to verify token
async def verify_token(request: Request):
    auth_header = request.headers.get("authorization")
    if not auth_header:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing auth header")
    
    token = auth_header.split("Bearer ")[-1]
    try:
        decoded_token = firebase_auth.verify_id_token(token)
        return decoded_token  # You can also return decoded_token["uid"] for the user id
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# Example protected endpoint
@app.get("/secure-route")
async def secure_route(user=Depends(verify_token)):
    return {"message": f"Hello {user['uid']}! You’re authenticated!"}
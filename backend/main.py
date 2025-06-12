
from fastapi import FastAPI, Request, Depends, HTTPException, status
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth

from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.

from app.api.routes import router as api_router
from app.socket.manager import ws_router
import os

app = FastAPI()

cred = credentials.Certificate({
    "type": "service_account",
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace('\\n', '\n'),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": os.getenv("FIREBASE_AUTH_URI"),
    "token_uri": os.getenv("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": os.getenv("FIREBASE_AUTH_PROVIDER_CERT_URL"),
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
})

if not firebase_admin._apps: #dictionary that stores all initialized Firebase apps
    firebase_admin.initialize_app(cred)

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
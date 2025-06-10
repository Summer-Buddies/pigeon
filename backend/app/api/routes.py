from fastapi import APIRouter, Depends, Header
from app.services.firebase_auth import verify_firebase_token

router = APIRouter()

@router.get("/me")
def get_profile(authorization: str = Header(...)):
    token = authorization.split(" ")[1]
    user = verify_firebase_token(token)
    return {"uid": user["uid"], "email": user.get("email")}
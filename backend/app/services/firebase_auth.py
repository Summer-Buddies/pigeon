import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException

cred = credentials.Certificate("app/firebase-adminsdk.json")
firebase_admin.initialize_app(cred)

def verify_firebase_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code = 401, detail = "Invalid Firebase token")

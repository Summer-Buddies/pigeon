import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException

private_key = os.getenv("FIREBASE_PRIVATE_KEY")
client_email = os.getenv("FIREBASE_CLIENT_EMAIL")
project_id = os.getenv("FIREBASE_PROJECT_ID")
client_id = os.getenv("FIREBASE_CLIENT_ID")
auth_uri = "https://accounts.google.com/o/oauth2/auth"
token_uri = "https://oauth2.googleapis.com/token"
auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs"
client_x509_cert_url = os.getenv("FIREBASE_CLIENT_CERT_URL")

firebase_cred_dict = {
    "type": "service_account",
    "project_id": project_id,
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": private_key.replace('\\n', '\n'),
    "client_email": client_email,
    "client_id": client_id,
    "auth_uri": auth_uri,
    "token_uri": token_uri,
    "auth_provider_x509_cert_url": auth_provider_x509_cert_url,
    "client_x509_cert_url": client_x509_cert_url,
}

cred = credentials.Certificate(firebase_cred_dict)
firebase_admin.initialize_app(cred)

def verify_firebase_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")

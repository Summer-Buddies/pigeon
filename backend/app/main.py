from fastapi import FastAPI
from dotenv import load_dotenv
from app.api.routes import router as api_router
from app.socket.manager import ws_router
import os

app = FastAPI()

load_dotenv()  # take environment variables from .env.

FIREBASE_KEY = os.getenv("FIREBASE_KEY")

app.include_router(api_router)
app.include_router(ws_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

